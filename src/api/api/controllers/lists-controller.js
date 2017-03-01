var Promise = require('Promise');

var appService = require('./../../services/app-service');
var tableService = require('./../../services/data-service').tables;

var listsService = appService.lists;
var contactsService = appService.contacts;
var referencesService = appService.references(tableService.tableNames.listsContacts, tableService.tableNames.contactsLists);

module.exports = {
    getAllLists: function(req, res){
        listsService
            .getAllLists()
            .then(function(lists) {
                res.json(lists);
            });
    },
    addList: function(req, res){
        var entity = req.swagger.params.entity.value;

        listsService
            .insertOrReplaceList(entity)
            .then(function(list) {
                res.json(list);
            });
    },
    getListById: function(req, res){
        var id = req.swagger.params.id.value;

        listsService
            .getListById(id)
            .then(function(list) {
                res.json(list);
            });
    },
    deleteListById: function(req, res){
        var id = req.swagger.params.id.value;

        listsService
            .deleteList(id)
            .then(function () {
                res.status(200).end();
            });
    },
    updateList: function(req, res){
        var id = req.swagger.params.id.value;
        var entity = req.swagger.params.entity.value;
        entity.id = id;

        listsService
            .insertOrReplaceList(entity)
            .then(function(list) {
                res.json(list);
            });
    },
    getContactsByListId: function(req, res){
        var id = req.swagger.params.id.value;

        referencesService
            .getChildsByParent(id)
            .then(function (ids) {
                return contactsService.getContactsByIds(ids);
            })
            .then(function (contacts) {
                res.json(contacts);
            });
    },
    addContractToList: function(req, res){
        var contactId = req.swagger.params.contactId.value;
        var listId = req.swagger.params.listId.value;

        referencesService
            .addReference(listId, contactId)
            .then(function () {
                res.status(200).end();
            });
    },
    removeContractFromList: function(req, res){
        var contactId = req.swagger.params.contactId.value;
        var listId = req.swagger.params.listId.value;

        referencesService
            .deleteReference(listId, contactId)
            .then(function () {
                res.status(200).end();
            });
    }
};