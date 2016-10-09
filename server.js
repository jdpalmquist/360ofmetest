/* 
	360 of me: Tech Skills Test for Jesse Palmquist 
*/

//	SERVER SETUP -- SPECIAL SETUP TO ACCOMODATE SOCKET.IO
var express 	= require('express')
var app 		= express();
var server 		= require('http').Server(app);
var io 			= require('socket.io')(server);


//	REQUIRED NPM LIBRARIES
var BodyParser      = require('body-parser');


// 	REQUIRED CUSTOM MODULES
var Cfg 		= require('./custom_modules/config_application');
var Db 			= require('./custom_modules/database');
var clientapi	= require('./custom_modules/client_rest_api');


//	MIDDLEWARE DECLARATIONS
app.use(BodyParser.json()); 
app.use(express.static('public'));


//	CLIENT API ROUTES
app.route('/get/orders').get(clientapi.get_orders);


//	SALESFORCE CALLBACK API ROUTES



//  SOCKET.IO ROUTING 
io.on('connection', function (socket) {
  //Examples
  /*
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  */
});


//	INITIALIZE THE SERVER PROCESS
app.listen(Cfg.get.port(), Cfg.print.server_start);