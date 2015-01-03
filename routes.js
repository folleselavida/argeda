var mailer = require('./mailers/mailer');
var User = require('./models/landing');

module.exports = function(app) {

app.get('/', function(req, res) {
	res.render('index'); 
});

app.get('/contact', function(req, res) {
	res.render('contact'); 
});

app.get('/services', function(req, res) {
	res.render('services'); 
});




app.post('/landing',function(req, res) {

	if (req.body.user === undefined) {
		console.log('missing parameter:first_name');
		return next("name not found")
	}
	if (req.body.email === undefined ) {
		console.log('missing parameter:email');
		return next("email not found")
	}
 	
	var user = new User({
		name:  	req.body.user,
		email:  req.body.email

	});

	mailer.contactus(req.body.user,req.body.email, req.body.message);

	user.save(function(err) {
		if(!err) {
			console.log('New user has been created');
			res.redirect('/'); 
		} else {
			console.log('ERROR: ' + err);
			res.redirect('/'); 
		}
	});		

});


/*

app.get('/email', function(req, res) {
	res.render('email'); 
});

app.post('/contact', mailer.contactus);

app.get('*', function(req, res) {
	res.render('404'); 
});*/

}