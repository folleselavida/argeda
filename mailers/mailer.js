var nodemailer = require('nodemailer');

exports.contactus = function(name, email, message) {


            // Create a SMTP transport object
            var transport = nodemailer.createTransport("SMTP", {

                host: "smtp.mandrillapp.com", // hostname
                port: 587, // port for secure SMTP
                auth: {
                    user: "app22836505@heroku.com",
                    pass: "G1dcSBrkhCJIu8JDxIM1qA"
                }

            });

            console.log('SMTP Configured');

            // Message object
            var message = {

                // sender info
                from:' <contactus@cannedhead.com> ',

                // Comma separated list of recipients
                to: 'contact@cannedhead.com',

                // Subject of the message
                subject: name+' '+email, //

                headers: {
                    'X-Laziness-level': 1000
                },

                // HTML body
                html:'Hello, someone wants to contact you, <br/>'+ 
                     '<b>Name:</b> '+name+'<br/>'+
                     '<b>Email:</b> '+email+'<br/>'+
                     '<b>Message:</b><br/>'+message+'<br/>'       
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