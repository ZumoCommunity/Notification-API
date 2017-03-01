var azureStorage = require('azure-storage');
var entityGenerator = azureStorage.TableUtilities.entityGenerator;

var service = {};

service.toStorage = function(appModel) {
    return {
        PartitionKey: entityGenerator.String(appModel.parentId),
        RowKey: entityGenerator.String(appModel.childId)
    };
};

service.toApp = function(storageModel) {
    return {
        parentId: storageModel.PartitionKey._,
        childId: storageModel.RowKey._
    };
};

module.exports = service;