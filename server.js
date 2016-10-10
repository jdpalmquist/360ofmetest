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
var Db 			= require('./custom_modules/database');
var clientapi	= require('./custom_modules/client_rest_api');
var salesforce 	= require('./custom_modules/salesforce_rest_api');


//	MIDDLEWARE DECLARATIONS
app.use(BodyParser.json()); 
app.use(express.static('public'));


//	CLIENT API ROUTES
app.route('/get/orders').get(clientapi.get_orders);
app.route('/get/order').post(clientapi.get_order);
app.route('/create/order').post(clientapi.create_order);


//	SALESFORCE CALLBACK API ROUTES
app.route('/salesforce/create/order/callback').post(salesforce.create_order_callback);


//  SOCKET.IO ROUTING 
io.on('connection', function (socket) {
  //Examples
  /*
  socket.on('my other event', function (data) {
    console.log(data);
  });
  */
  socket.emit('news', { hello: 'world' });

  socket.on('get orders', function(callback){
  	var orders = [
  		{number: 1, items: ['apple', 'pear', 'lemon']},
  		{number: 2, items: ['onions', 'lettuce', 'celery']}
  	];
  	callback(orders);
  });
});


//	INITIALIZE THE SERVER PROCESS -- NOTE: SPECIAL CONFIG DUE TO SOCKET.IO INTEGRATION
server.listen(Cfg.get.port(), Cfg.print.server_start);