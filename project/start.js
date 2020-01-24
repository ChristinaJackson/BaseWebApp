//indicated we want to use express
var express = require('express');
//creates an express app by setting it equal to a variable
var app = express();
//gives the app a port to run on and gives express the dir to look in for files
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/html');
//tells express youll be using ejs as your templating language
app.set('view engine', 'ejs');

//tells express what to do when it gets a request, when a user requests a Url,
 //express responds by rendering the index page
app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/about', function(request, response) {
  response.render('pages/about');
});
app.get('/projects', function(request, response) {
  response.render('pages/projects');
});
//binds the app to a port on your machine and sends a message to your console
// to indicate the server is running
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// This file is what handles incoming requests and
// serves files to the browser, or executes server-side code
