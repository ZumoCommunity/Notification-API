var azureStorage = require('azure-storage');
var entityGenerator = azureStorage.TableUtilities.entityGenerator;

var service = {};

service.toStorage = function(appModel) {
    return {
        PartitionKey: entityGenerator.String(''),
        RowKey: entityGenerator.String(appModel.id),
        Title: entityGenerator.String(appModel.title)
    };
};

service.toApp = function(storageModel) {
    return {
        id: storageModel.RowKey._,
        title: storageModel.Title._
    };
};

module.exports = service;