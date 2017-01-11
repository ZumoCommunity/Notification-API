var table = require('azure-mobile-apps').table();

// Define the columns within the table
table.columns = {
    "fullName": "string",
    "email": "string"
};

// Turn off dynamic schema
table.dynamicSchema = false;

//adding seeding data
table.seed = [
    {"fullName" : "Anton Boyko", "email" : "boyko.ant@live.com", "id" : "1"},
    {"fullName" : "Yevhen Vakulchyk", "email" : "e.vakulchyk@gmail.com", "id" : "2"},
    {"fullName" : "Yevhen Outlook", "email" : "yevak@outlook.com", "id" : "3"}
]

module.exports = table;