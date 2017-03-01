var service = {};

service.contacts = require('./app/contacts');
service.lists = require('./app/lists');
service.references = require('./app/references');

module.exports = service;