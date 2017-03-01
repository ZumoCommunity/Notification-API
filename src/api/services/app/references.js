var Promise = require('Promise');

var tableService = require('./../data-service').tables;
var mappingService = require('./../mapping-service');

function create(parentTable, childTable) {
    var service = this;

    service.parentTable = parentTable;
    service.childTable = childTable;

    service.addReference = function (parentId, childId) {
        var promises = [];

        promises.push(tableService.insertOrReplaceEntity(service.parentTable, mappingService.references.toStorage({ parentId: parentId, childId: childId })));
        promises.push(tableService.insertOrReplaceEntity(service.childTable, mappingService.references.toStorage({ parentId: childId, childId: parentId })));

        return Promise.all(promises);
    };

    service.deleteReference = function (parentId, childId) {
        var promises = [];

        promises.push(tableService.deleteEntity(service.parentTable, parentId, childId));
        promises.push(tableService.deleteEntity(service.childTable, childId, parentId));

        return Promise.all(promises);
    };

    service.getChildsByParent = function (parentId) {
        return tableService
            .getByFilter(service.parentTable, parentId)
            .then(function (entities) {
                var childs = entities
                    .map(mappingService.references.toApp)
                    .map(function (ref) {
                        return ref.childId;
                    });

                return Promise.resolve(childs);
            });
    };

    service.getParentsByChild = function (childId) {
        return tableService
            .getByFilter(service.childTable, childId)
            .then(function (entities) {
                var childs = entities
                    .map(mappingService.references.toApp)
                    .map(function (ref) {
                        return ref.childId;
                    });

                return Promise.resolve(childs);
            });
    };

    return service;
}

module.exports = create;