var Promise = require('Promise');

var tableService = require('./../data').tables;
var mappingService = require('./../mapping');

function create(parentTable, childTable) {
    var service = this;

    service.parentTable = parentTable;
    service.childTable = childTable;

    service.addReference = function (parentId, childId) {
        var promises = [];

        promises.push(tableService.insertOrReplaceEntity(service.parentTable, mappingService.references.toStorage({ pk: parentId, rk: childId })));
        promises.push(tableService.insertOrReplaceEntity(service.childTable, mappingService.references.toStorage({ pk: childId, rk: parentId })));

        return Promise.all(promises);
    };

    service.deleteReference = function (parentId, childId) {
        var promises = [];

        promises.push(tableService.deleteEntity(service.parentTable, parentId, childId));
        promises.push(tableService.deleteEntity(service.childTable, childId, parentId));

        return Promise.all(promises);
    };

    return service;
}

module.exports = create;