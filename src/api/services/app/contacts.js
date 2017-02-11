var Promise = require('Promise');

var tableService = require('./../data').tables;
var mappingService = require('./../mapping');

var service = {};

service.getAllContacts = function() {
    return tableService
        .getByFilter(tableService.tableNames.contacts)
        .then(function(entities) {
            entities = entities.map(mappingService.contacts.toApp);
            return Promise.resolve(entities);
        });
};

service.insertOrReplaceContact = function(contact) {
    if (!!contact.id) {
        contact.id = tableService.getNewId();
    }

    var entity = mappingService.contacts.toStorage(contact);

    return tableService.insertOrReplaceEntity(tableService.tableNames.contacts, entity);
};

service.deleteContact = function(id) {
    var promises = [];

    promises.push(tableService.deleteEntity(tableService.tableNames.contacts, tableService.defaultPK, id));
    promises.push(tableService.deleteByFilter(tableService.tableNames.contactsLists, { PartitionKey: id }));
    promises.push(tableService.deleteByFilter(tableService.tableNames.listsContacts, { RowKey: id }));

    return Promise.all(promises);
};

module.exports = service;