/* 
	360 of me: Tech Skills Test for Jesse Palmquist 
*/

//	nodemon server.js -w /custom_modules -w /package.json -w /server.js -e html,json,css,js


//	SERVER SETUP -- SPECIAL SETUP TO ACCOMODATE SOCKET.IO
var express 	= require('express')
var app 		= express();
var server 		= require('http').Server(app);
var io 			= require('socket.io')(server);


//	REQUIRED NPM LIBRARIES
var body_parser = require('body-parser');


// 	REQUIRED CUSTOM MODULES
var cfg 		= require('./custom_modules/config_application');
var socketapi 	= require('./custom_modules/rest_api_socketio');


//	MIDDLEWARE DECLARATIONS
app.use(body_parser.json()); 
app.use(express.static(__dirname + '/public')); //static serve the SPA html from ./public/


//  SOCKET.IO ROUTING 
io.on('connection', function (socket) {
	//CLIENT --> SERVER: GET ORDERS HANDLER
	socket.on('/socketio/get/orders', function(){ socketapi.on.get_orders_from_salesforce(socket); });

});


//	INITIALIZE THE SERVER PROCESS -- NOTE: SPECIAL CONFIG DUE TO SOCKET.IO INTEGRATION
server.listen(cfg.get.port(), cfg.print.server_start);