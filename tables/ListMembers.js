var table = require('azure-mobile-apps').table();

// Define the columns within the table
table.columns = {
    "fullName": "string",
    "email": "string"
};

// Turn off dynamic schema
table.dynamicSchema = false;

module.exports = table;