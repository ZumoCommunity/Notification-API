var table = require('azure-mobile-apps').table();

// Define the columns within the table
table.columns = {
    "listId": "string",
    "memberId": "string"
};

// Turn off dynamic schema
table.dynamicSchema = false;

module.exports = table;