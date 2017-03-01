var Promise = require('Promise');

var tableService = require('./../data-service').tables;
var mappingService = require('./../mapping-service');

var service = {};

service.getAllLists = function() {
    return tableService
        .getByFilter(tableService.tableNames.lists)
        .then(function(entities) {
            var lists = entities.map(mappingService.lists.toApp);
            return Promise.resolve(lists);
        });
};

service.getListById = function(id) {
    return tableService
        .retrieveEntity(tableService.tableNames.lists, tableService.defaultPK, id)
        .then(function(entity) {
            var list = mappingService.lists.toApp(entity);
            return Promise.resolve(list);
        });
};

service.insertOrReplaceList = function(list) {
    if (!list.id) {
        list.id = tableService.getNewId();
    }

    var entity = mappingService.lists.toStorage(list);

    return tableService
        .insertOrReplaceEntity(tableService.tableNames.lists, entity)
        .then(function(insertedEntity) {
            var insertedList = mappingService.lists.toApp(insertedEntity);
            return Promise.resolve(insertedList);
        }, function(error) {
            return Promise.reject(error);
        });
};

service.getListsByIds = function (ids) {
    return tableService
        .getByRowKeys(tableService.tableNames.lists, tableService.defaultPK, ids)
        .then(function(entities) {
            var lists = entities.map(mappingService.lists.toApp);
            return Promise.resolve(lists);
        });
};

service.deleteList = function(id) {
    var promises = [];

    promises.push(tableService.deleteEntity(tableService.tableNames.lists, tableService.defaultPK, id));
    promises.push(tableService.deleteByFilter(tableService.tableNames.listsContacts, { PartitionKey: id }));
    promises.push(tableService.deleteByFilter(tableService.tableNames.contactsLists, { RowKey: id }));

    return Promise.all(promises);
};

module.exports = service;