/* 
	360 of me: Tech Skills Test for Jesse Palmquist 
*/

//	SERVER SETUP -- SPECIAL SETUP TO ACCOMODATE SOCKET.IO
var app 		= require('express')();
var server 		= require('http').Server(app);
var io 			= require('socket.io')(server);


//	REQUIRED NPM LIBRARIES



// 	REQUIRED CUSTOM MODULES
var Cfg 		= require('./custom_modules/config_application');
var Db 			= require('./custom_modules/database');


//	MIDDLEWARE DECLARATIONS



//	CLIENT API ROUTES



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
app.listen(Cfg.get.port(), Cfg.print.server_start());