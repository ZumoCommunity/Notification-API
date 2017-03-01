var Promise = require('Promise');

var tableService = require('./../data-service').tables;
var mappingService = require('./../mapping-service');

var service = {};

service.getAllContacts = function() {
    return tableService
        .getByFilter(tableService.tableNames.contacts)
        .then(function(entities) {
            var contacts = entities.map(mappingService.contacts.toApp);
            return Promise.resolve(contacts);
        });
};

service.getContactById = function(id) {
    return tableService
        .retrieveEntity(tableService.tableNames.contacts, tableService.defaultPK, id)
        .then(function(entity) {
            var contact = mappingService.contacts.toApp(entity);
            return Promise.resolve(contact);
        });
};

service.insertOrReplaceContact = function(contact) {
    if (!contact.id) {
        contact.id = tableService.getNewId();
    }

    var entity = mappingService.contacts.toStorage(contact);

    return tableService
        .insertOrReplaceEntity(tableService.tableNames.contacts, entity)
        .then(function(insertedEntity) {
            var insertedContract = mappingService.contacts.toApp(insertedEntity);
            return Promise.resolve(insertedContract);
        }, function(error) {
            return Promise.reject(error);
        });
};

service.deleteContact = function(id) {
    var promises = [];

    promises.push(tableService.deleteEntity(tableService.tableNames.contacts, tableService.defaultPK, id));
    promises.push(tableService.deleteByFilter(tableService.tableNames.contactsLists, { PartitionKey: id }));
    promises.push(tableService.deleteByFilter(tableService.tableNames.listsContacts, { RowKey: id }));

    return Promise.all(promises);
};

service.getContactsByIds = function (ids) {
    return tableService
        .getByRowKeys(tableService.tableNames.contacts, tableService.defaultPK, ids)
        .then(function(entities) {
            var contacts = entities.map(mappingService.contacts.toApp);
            return Promise.resolve(contacts);
        });
};

module.exports = service;