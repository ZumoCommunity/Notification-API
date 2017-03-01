var Promise = require('promise');

var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

module.exports = app;

var initializationService = require('./services/initializationService');

var swaggerExpressConfig = {
    appRoot: __dirname
};

var swaggerUiOptions = {
  swaggerUi: '/'
};

SwaggerExpress.create(swaggerExpressConfig, function(err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // add swagger-ui (this must be before swaggerExpress.register)
    app.use(SwaggerUi(swaggerExpress.runner.swagger, swaggerUiOptions));

    swaggerExpress.register(app);

    initializationService
        .init()
        .then(function () {
            var port = process.env.PORT || 10010;
            app.listen(port);

            console.log('Notification API ready on port ' + port);
        }, function (error) {
            console.log(error);
        });
});
