/* ADAPTER REQUEST-SALESFORCE: OAUTH AUTHORIZATION & QUERIES */


//  LOAD THE CONFIG MODULES
var cfg     = require('./config_salesforce');


//	LOAD THE REQUIRED MODULES
var reuest 	= require('request');


var options = {
  url: cfg.oauth.loginUrl,
  grant_type: 'password',
  client_id: cfg.consumerKey,
  client_secret: cfg.clientSecret,
  username: cfg.username,
  password: cfg.password
};

request.get(options, function(error, response, body){
	if(error){
		console.error('SALESFORCE_REST_API --> salesforce_request() --> error: ', error);
	}
	else{
		//console.log('SALESFORCE_REST_API --> salesforce_request() --> response: ', response);
		console.log('SALESFORCE_REST_API --> salesforce_request() --> body: ', body);
	}
});