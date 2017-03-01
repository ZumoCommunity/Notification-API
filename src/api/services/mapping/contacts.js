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
        email: getValue(storageModel.Email),
        facebook: getValue(storageModel.Facebook),
        skype: getValue(storageModel.Skype)
    };
};

function getValue(property) {
    if (!property) {
        return '';
    } else {
        return property._;
    }
}

module.exports = service;