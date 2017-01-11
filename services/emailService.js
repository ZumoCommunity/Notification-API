function sendEmail(fromMail, toMail, mailSubject, mailContent) {
    var helper = require('sendgrid').mail;
    var from_email = new helper.Email(fromMail);
    var to_email = new helper.Email(toMail);
    var subject = mailSubject;
    var content = new helper.Content('text/plain', mailContent);
    console.log('1');
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')('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');
    var sgRequest = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(sgRequest, function(err, resp) {
        console.log(resp.statusCode);
        console.log(resp.body);
        console.log(resp.headers);
        console.log(err);
    });
}

var service = {};

// 1. get all emails from database
service.sendEmailToList = function(azureMobile, listId, emailText) {
    var query = {
        sql: 'select lm.email from listMembers lm inner join NotificationListMemberships nm on nm.memberId=lm.id where nm.listId = @listId',
        parameters: [
            { name: 'listId', value: listId }
        ]
    };
    
    // 2. for each email call sendEmail function
    azureMobile.data.execute(query)
        .then(function(results){
            for (var i=0; i<results.length; i++) {
                sendEmail('evgen2v@gmail.com', results[i].email, 'superSubj', emailText);
            }
    });
};

module.exports = service;