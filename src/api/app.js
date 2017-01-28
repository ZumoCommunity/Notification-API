'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

var swaggerExpressConfig  = {
  appRoot: __dirname // required config
};

var swaggerUiOptions = {
	swaggerUi: '/'
};

SwaggerExpress.create(swaggerExpressConfig , function(err, swaggerExpress) {
  if (err) { throw err; }

  // Add swagger-ui (This must be before swaggerExpress.register)
	app.use(SwaggerUi(swaggerExpress.runner.swagger, swaggerUiOptions));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
