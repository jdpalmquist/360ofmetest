/* 
	360 of me: Tech Skills Test for Jesse Palmquist 
*/

//	SERVER SETUP -- SPECIAL SETUP TO ACCOMODATE SOCKET.IO
var express 	= require('express')
var app 		= express();
var server 		= require('http').Server(app);
var io 			= require('socket.io')(server);


//	REQUIRED NPM LIBRARIES
var BodyParser  = require('body-parser');


// 	REQUIRED CUSTOM MODULES
var Cfg 		= require('./custom_modules/config_application');
//var Db 			= require('./custom_modules/database');
var salesforce 	= require('./custom_modules/rest_api_salesforce');
var socketapi 	= require('./custom_modules/rest_api_socketio');


//	MIDDLEWARE DECLARATIONS
app.use(BodyParser.json()); 
app.use(express.static('public')); //static serve the SPA html from ./public/


//	SALESFORCE CALLBACK API ROUTES
app.route('/salesforce/oauth/callback').all(salesforce.oauth_callback);
app.route('/salesforce/create/order/callback').post(salesforce.create_order_callback);


//  SOCKET.IO ROUTING 
io.on('connection', function (socket) {
	//CLIENT --> SERVER: GET ORDERS HANDLER
	socket.on('/socketio/get/orders', function(){ socketapi.on.get_orders_from_salesforce(socket); });

});


//	INITIALIZE THE SERVER PROCESS -- NOTE: SPECIAL CONFIG DUE TO SOCKET.IO INTEGRATION
server.listen(Cfg.get.port(), Cfg.print.server_start);