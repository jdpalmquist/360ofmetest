/* 360 of me: Tech Skills Test for Jesse Palmquist */


//	REQUIRED NPM LIBRARIES
var Express = require('express');


// 	REQUIRED CUSTOM MODULES
var Cfg = require('./custom_modules/config_application');
var Db = require('./custom_modules/database');

//	BEGIN APPLICATION DEFINITION
var app = Express();


//	MIDDLEWARE DECLARATIONS
//


//	CLIENT API ROUTES



//	SALESFORCE CALLBACK API ROUTES



app.listen(Cfg.get.port(), Cfg.print.server_start());