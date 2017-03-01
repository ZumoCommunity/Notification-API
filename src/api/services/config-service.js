var nconf = require('nconf');

var service = {};

nconf
    .argv()
    .env()
    .file({ file: 'appconfig.json' })
    .defaults({
        'SendGridApiKey': '',
        'StorageConnectionString': ''
    });

service.SendGridApiKey = nconf.get('SendGridApiKey');
service.StorageConnectionString = nconf.get('StorageConnectionString');

module.exports = service;