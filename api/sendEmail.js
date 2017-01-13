var emailService = require('./../services/emailService');

var api = {
    post: function(request, response, next) {
        console.log(request.body);
        
        var listIds = request.body.listIds;
        var letterText =  request.body.text;

        emailService.sendEmailToList(request.azureMobile, listIds, letterText);
        response.json({});
    }
};

module.exports = api;