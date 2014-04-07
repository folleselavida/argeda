var nodemailer = require('nodemailer');

exports.contactus = function(req, res) {

            var name = req.body.user;
            var email = req.body.email;
            var message = req.body.message;

            console.log('POST /contact');

            // Create a SMTP transport object
            var transport = nodemailer.createTransport("SMTP", {
                    service: 'Gmail', 
                    auth: {
                        user: "----",
                        pass: "---"
                    }
                });

            console.log('SMTP Configured');

            var path = require("path"),
                ejs = require('ejs')
              , fs = require('fs')
              , str = fs.readFileSync(path.join(__dirname,'/email.ejs'), 'utf8'); 

            var messageHtml = ejs.render(str, viewArgs);

            // Message object
            var message = {

                // sender info
                from: 'contact <contactus@cannedhead.com>',

                // Comma separated list of recipients
                to: 'jdavid@cannedhead.com',

                // Subject of the message
                subject: 'contact us', //

                headers: {
                    'X-Laziness-level': 1000
                },

                // HTML body
                /*html:'Hello, someone wants to contact you, <br/>'+ 
                     '<b>Name:</b> '+name+'<br/>'+
                     '<b>Email:</b> '+email+'<br/>'+
                     '<b>Message:</b><br/>'+message,*/

                html:messageHtml,        
            };

            console.log('Sending Mail');

            transport.sendMail(message, function(error){
                if(error){
                    console.log('Error occured');
                    console.log(error.message);
                    return;
                }
                console.log('Message sent successfully!');

                // if you don't want to use this transport object anymore, uncomment following line
                transport.close(); // close the connection pool
            });
};