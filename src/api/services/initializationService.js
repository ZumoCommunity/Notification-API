var Promise = require('Promise');

var dataService = require('./data-service');

var service = {};

service.init = function () {
    var promises = Object
        .keys(dataService.tables.tableNames)
        .map(function (table) {
            var tableName = dataService.tables.tableNames[table];
            return dataService.tables.createTableIfNotExists(tableName);
        });

    return Promise.all(promises);
};

module.exports = service;