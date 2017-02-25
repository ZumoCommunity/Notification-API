var service = {};

service.contacts = require('./mapping/contacts');
service.lists = require('./mapping/lists');
service.references = require('./mapping/references');

module.exports = service;