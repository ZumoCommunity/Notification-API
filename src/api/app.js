var Promise = require('promise');

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

module.exports = app;

var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

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

    var port = process.env.PORT || 10010;
    app.listen(port);
});
