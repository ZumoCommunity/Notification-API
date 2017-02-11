var Promise = require('Promise');

var configService = require('./../config-service');

var service = {};

service.tableNames = {
    contacts: 'Contacts',
    contactsLists: 'ContactsLists',
    lists: 'Lists',
    listsContacts: 'ListsContacts'
};

var azureStorage = require('azure-storage');
var azureStorageTableService = azureStorage.createTableService(configService.StorageConnectionString);

service.createTableIfNotExists = function(tableName) {
    return new Promise(function(resolve, reject) {
        azureStorageTableService.createTableIfNotExists(tableName, function() {
            resolve();
        });
    });
};

service.getByFilter = function(tableName, partitionKey, rowKey, customFilter) {
    var combinedFilterProperties = customFilter || {};

    if (!!partitionKey) {
        combinedFilterProperties.PartitionKey = partitionKey;
    }

    if (!!rowKey) {
        combinedFilterProperties.RowKey = rowKey;
    }

    var combinedFilterQuery;
    var keys = Object.keys(combinedFilterProperties);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = combinedFilterProperties[key];

        var filter;
        switch (typeof value) {
            case 'boolean':
                filter = azureStorage.TableQuery.booleanFilter(key, azureStorage.TableUtilities.QueryComparisons.EQUAL, value);
                break;
            default:
                filter = azureStorage.TableQuery.stringFilter(key, azureStorage.TableUtilities.QueryComparisons.EQUAL, value);
                break;
        }

        if (!!combinedFilterQuery) {
            combinedFilterQuery = azureStorage.TableQuery.combineFilters(combinedFilterQuery, azureStorage.TableUtilities.TableOperators.AND, filter);
        } else {
            combinedFilterQuery = filter;
        }
    }

    var query = !!combinedFilterQuery ?
        azureStorage.TableQuery().where(combinedFilterQuery) :
        azureStorage.TableQuery();

    return new Promise(function(resolve, reject) {
        azureStorageTableService.queryEntities(tableName, query, null, function(error, result){
            if (!error) {
                resolve(result.entries);
            } else {
                reject(error);
            }
        });
    });
};

service.insertOrReplaceEntity = function(tableName, entity) {
    return new Promise(function(resolve, reject) {
        azureStorageTableService.insertOrReplaceEntity(tableName, entity, function(error, result, response){
            if (!error) {
                resolve();
            } else {
                reject(error);
            }
        });
    });
};

service.deleteEntity = function(tableName, partitionKey, rowKey) {
    var keys = {
        PartitionKey: { '_': partitionKey },
        RowKey: { '_': rowKey }
    };

    return new Promise(function(resolve, reject) {
        azureStorageTableService.deleteEntity(tableName, keys, function(error, result, response){
            if (!error) {
                resolve();
            } else {
                reject(error);
            }
        });
    });
};

service.deleteByFilter = function(tableName, customFilter){
    return service
        .getByFilter(tableName, null, null, customFilter)
        .then(function(entities) {
            if (entities.length == 0) {
                return Promise.resolve();
            }

            var promises = [];

            var partitions = Array.from(new Set(entities.map(function(entity) {
                return entity.PartitionKey._;
            })));

            for (var i = 0; i < partitions.length; i++) {
                var partitionKey = partitions[i];

                var batch = new azureStorage.TableBatch();

                var entitiesInPartition = entities.filter(function (entity) {
                    return entity.PartitionKey._ == partitionKey;
                });

                for (var j = 0; j < entitiesInPartition.length; j++) {
                    batch.deleteEntity(entitiesInPartition[j]);

                    if (batch.size() == 100) {
                        promises.push(azureStorageTableService.executeBatch(tableName, batch));
                        batch = new azureStorage.TableBatch();
                    }
                }

                if (batch.hasOperations()) {
                    promises.push(azureStorageTableService.executeBatch(tableName, batch));
                }
            }

            return Promise.all(batch);
        });
};

module.exports = service;