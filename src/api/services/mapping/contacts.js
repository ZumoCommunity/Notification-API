var azureStorage = require('azure-storage');
var entityGenerator = azureStorage.TableUtilities.entityGenerator;

var service = {};

service.toStorage = function(appModel) {
    return {
        PartitionKey: entityGenerator.String(''),
        RowKey: entityGenerator.String(appModel.id),
        Email: entityGenerator.String(appModel.email),
        Facebook: entityGenerator.String(appModel.facebook),
        Skype: entityGenerator.String(appModel.skype)
    };
};

service.toApp = function(storageModel) {
    return {
        id: storageModel.RowKey._,
        email: storageModel.Title._,
        facebook: storageModel.Title._,
        skype: storageModel.Title._
    };
};

module.exports = service;