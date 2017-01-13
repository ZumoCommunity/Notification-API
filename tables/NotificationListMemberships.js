var table = require('azure-mobile-apps').table();

// Define the columns within the table
table.columns = {
    "listId": "string",
    "memberId": "string"
};

// Turn off dynamic schema
table.dynamicSchema = false;

table.seed = [
    {"listId": "1", "memberId" : "2"},
    {"listId": "2", "memberId" : "2"},
    {"listId": "2", "memberId" : "3"}
]

module.exports = table;