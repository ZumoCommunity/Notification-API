var Promise = require('Promise');

var tableService = require('./../data').tables;
var mappingService = require('./../mapping');

var service = {};

service.getAllLists = function() {
    return tableService
        .getByFilter(tableService.tableNames.lists)
        .then(function(entities) {
            entities = entities.map(mappingService.lists.toApp);
            return Promise.resolve(entities);
        });
};

service.insertOrReplaceList = function(list) {
    if (!!list.id) {
        list.id = tableService.getNewId();
    }

    var entity = mappingService.lists.toStorage(list);

    return tableService.insertOrReplaceEntity(tableService.tableNames.lists, entity);
};

service.deleteList = function(id) {
    var promises = [];

    promises.push(tableService.deleteEntity(tableService.tableNames.lists, tableService.defaultPK, id));
    promises.push(tableService.deleteByFilter(tableService.tableNames.listsContacts, { PartitionKey: id }));
    promises.push(tableService.deleteByFilter(tableService.tableNames.contactsLists, { RowKey: id }));

    return Promise.all(promises);
};

module.exports = service;