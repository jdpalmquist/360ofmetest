/* 
	360 of me: Tech Skills Test for Jesse Palmquist 
*/

//	nodemon server.js -w /custom_modules -w /package.json -w /server.js -e html,json,css,js


//	SERVER SETUP -- SPECIAL SETUP TO ACCOMODATE SOCKET.IO
var express 	= require('express');
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


//	DESCRIBE ROUTES FOR DISPLAYING SALESFORCE OBJECT METADATA
app.route('/describe/account').get(socketapi.on.describe.account);
app.route('/describe/order').get(socketapi.on.describe.order);
app.route('/describe/product').get(socketapi.on.describe.product);



//  SOCKET.IO ROUTING 
io.on('connection', function (socket) {
	//	CLIENT --> SERVER: GET ORDERS HANDLER
	//socket.on('/server/get/orders', function(){ socketapi.on.get_orders(socket); });


	//	CLIENT --> SERVER: GET ALL ACCOUNTS
	socket.on('/server/get/accounts', function(){ socketapi.on.get.all_accounts(socket, 'accounts'); });
	socket.on('/server/get/accounts/for/orders/page', function(){ socketapi.on.get.all_accounts(socket, 'create_order'); });


	//	CLIENT --> SERVER: CREATE ACCOUNT
	socket.on('/server/create/account', function(data){ socketapi.on.create.account(socket, data); });




	//	CLIENT --> SERVER: GET ALL ORDERS
	socket.on('/server/get/orders', function(){ socketapi.on.get.all_orders(socket); });


	//	CLIENT --> SERVER: CREATE ORDER
	socket.on('/server/create/order', function(data){ socketapi.on.create.order(socket, data); });
});


//	INITIALIZE THE SERVER PROCESS -- NOTE: SPECIAL CONFIG DUE TO SOCKET.IO INTEGRATION
server.listen(cfg.get.port(), cfg.print.server_start);