var Promise = require('Promise');

var appService = require('./../../services/app-service');
var tableService = require('./../../services/data-service').tables;

var contactsService = appService.contacts;
var referencesService = appService.references(tableService.tableNames.contactsLists, tableService.tableNames.listsContacts);

module.exports = {
    getAllContacts: function(req, res){
        contactsService
            .getAllContacts()
            .then(function(contacts) {
                res.json(contacts);
            });
    },
    addContact: function(req, res){
        var entity = req.swagger.params.entity.value;

        contactsService
            .insertOrReplaceContact(entity)
            .then(function(contact) {
                res.json(contact);
            });
    },
    getContactById: function(req, res){
        var id = req.swagger.params.id.value;

        contactsService
            .getContactById(id)
            .then(function(contact) {
                res.json(contact);
            });
    },
    deleteContactById: function(req, res){
        var id = req.swagger.params.id.value;

        contactsService
            .deleteContact(id)
            .then(function () {
                res.status(200).end();
            });
    },
    updateContact: function(req, res){
        var id = req.swagger.params.id.value;
        var entity = req.swagger.params.entity.value;
        entity.id = id;

        contactsService
            .insertOrReplaceContact(entity)
            .then(function(contact) {
                res.json(contact);
            });
    },
    getListsByContactId: function(req, res){
        var id = req.swagger.params.id.value;

        res.json([]);
    },
    subscribeContractToList: function(req, res){
        var contactId = req.swagger.params.contactId.value;
        var listId = req.swagger.params.listId.value;

        referencesService
            .addReference(contactId, listId)
            .then(function () {
                res.status(200).end();
            });
    },
    unsubscribeContractFromList: function(req, res){
        var contactId = req.swagger.params.contactId.value;
        var listId = req.swagger.params.listId.value;

        referencesService
            .deleteReference(contactId, listId)
            .then(function () {
                res.status(200).end();
            });
    }
};