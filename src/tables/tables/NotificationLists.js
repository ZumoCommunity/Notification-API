var table = require('azure-mobile-apps').table();

// Define the columns within the table
table.columns = {
    "title": "string"
};

// Turn off dynamic schema
table.dynamicSchema = false;

table.seed = [
    {"title": "January conference", "id" : "1"},
    {"title": "February conference", "id" : "2"}
]

module.exports = table;