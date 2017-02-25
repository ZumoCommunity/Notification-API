var Promise = require('Promise');

var appService = require('./../../services/app');

var listsService = appService.lists;
var referencesService = appService.references(tableService.tableNames.contactsLists, tableService.tableNames.listsContacts);

module.exports = {
    getAllLists: function(req, res){
        res.json([]);
    },
    addList: function(req, res){
        var entity = req.swagger.params.entity.value;

        res.json(entity);
    },
    getListById: function(req, res){
        var id = req.swagger.params.id.value;

        res.json({});
    },
    deleteListById: function(req, res){
        var id = req.swagger.params.id.value;

        res.status(200).end();
    },
    updateList: function(req, res){
        var id = req.swagger.params.id.value;
        var entity = req.swagger.params.entity.value;

        res.json(entity);
    },
    addContractToList: function(req, res){
        var contactId = req.swagger.params.contactId.value;
        var listId = req.swagger.params.listId.value;

        referencesService
            .addReference(contactId, listId)
            .then(function () {
                res.status(200).end();
            });
    },
    removeContractFromList: function(req, res){
        var contactId = req.swagger.params.contactId.value;
        var listId = req.swagger.params.listId.value;

        referencesService
            .deleteReference(contactId, listId)
            .then(function () {
                res.status(200).end();
            });
    }
};