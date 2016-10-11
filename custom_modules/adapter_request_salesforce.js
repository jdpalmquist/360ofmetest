/* ADAPTER REQUEST-SALESFORCE: OAUTH AUTHORIZATION & QUERIES */


//  LOAD THE CONFIG MODULES
var cfg     = require('./config_salesforce');


//	LOAD THE REQUIRED MODULES
var request = require('request');


var options = {
	url: cfg.oauth.loginUrl,
	grant_type: 'password',
	client_id: cfg.consumerKey,
	client_secret: cfg.clientSecret,
	username: cfg.username,
	password: cfg.password + cfg.accessToken
};

request.post(options, function(error, response, body){
	if(error){
		console.error('SALESFORCE_REST_API --> salesforce_request() --> error: ', error);
	}
	else{
		//console.log('SALESFORCE_REST_API --> salesforce_request() --> response: ', response);
		console.log('SALESFORCE_REST_API --> salesforce_request() --> body: ', body);
	}
});


//
function oauth_callback(req, res){
  var params = req.body;
  console.log('SALESFORCE_REST_API --> oauth_callback() --> params: ', params);
}


module.exports = {
    oauth_callback: oauth_callback,

};