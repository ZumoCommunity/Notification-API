var emailService = require('service');

var api = {};

api.sendEmail = function(request, response){
    var task = request.swagger.params.sendEmail.value;
    var listIds = task.listIds;
    var letterText =  request.body.text;
    
    console.log(task + " and id: " + listIds + " and  innerText: " + letterText );

    response.status(200).end();
};

module.exports = api;