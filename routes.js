var mailer = require('./mailers/mailer');

module.exports = function(app) {

app.get('/', function(req, res) {
	res.render('index'); 
});

app.get('/portfolio', function(req, res) {
	res.render('portfolio'); 
});

/*app.get('/contact', function(req, res) {
	res.render('contact'); 
});

app.get('/email', function(req, res) {
	res.render('email'); 
});

app.post('/contact', mailer.contactus);

app.get('*', function(req, res) {
	res.render('404'); 
});*/

}