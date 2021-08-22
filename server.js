var express = require('express');
var app = express();
var app_port = 3000;

app.listen(app_port, function(){
	console.log('Server is running on port ' + app_port);
});

// Served to user from Node JS
app.get('/', getHomePage);

// Served to user from PHP
app.get('/about', getAboutPage);

// Served to user from Python
app.get('/contact', getContactPage);

function getHomePage(req, res){
	res.send(`<html><head><title>Home Page</title></head>
			  <body><h1>Node Web Server - Hybrid Serve - 
			  This page is served by Node JS</h1></body></html>`);
}

function getAboutPage(req, res){
	var spawn = require('child_process').spawn;
	var process = spawn('php',["./about.php",req.query.type]);
	process.stdout.on('data',function(data){
		res.send(data.toString());
	});
}

function getContactPage(req, res){
	var spawn = require('child_process').spawn;
	var process = spawn('python',["./contact.py",req.query.type]);
	process.stdout.on('data',function(data){
		res.send(data.toString());
	});
}

