var app = require('express')();
var options = {
    homePage: true,
    swagger: true
}

var mobileApp = require('azure-mobile-apps')(options);

// Define the database schema that is exposed
mobileApp.tables.import('./tables');

//importing api
mobileApp.api.import('./api');

mobileApp.tables.initialize()
    .then(function(){
        app.use(mobileApp);
        app.listen(process.env.PORT || 3000);
    });
