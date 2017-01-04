var app = require('express')();
var options = {
    homePage: true,
    swagger: true
}

var mobileApp = require('azure-mobile-apps')(options);


app.use(mobileApp);
app.listen(process.env.PORT || 3000);