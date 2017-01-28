var emailService = {};

function sendEmail(fromMail, toMail, mailSubject, mailContent) {
    console.log(toMail);
    var helper = require('sendgrid').mail;
    var from_email = new helper.Email(fromMail);
    var to_email = new helper.Email(toMail);
    var subject = mailSubject;
    var content = new helper.Content('text/plain', mailContent);
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')('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');
    var sgRequest = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(sgRequest, function(err, resp) {
        console.log(resp.statusCode);
        // console.log(resp.body);
        // console.log(resp.headers);
        // console.log(err);
    });
}

module.exports = service;