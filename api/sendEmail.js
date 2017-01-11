var emailService = require('./../services/emailService');

var api = {
    post: function(request, response, next) {


        var listId = request.body.listId;
        var letterText =  request.body.text;

        emailService.sendEmailToList(request.azureMobile, listId, letterText);
        response.json({});
    }
};

module.exports = api;