/* ADAPTER REQUEST-SALESFORCE: OAUTH AUTHORIZATION & QUERIES */


//  LOAD THE CONFIG MODULES
var cfg     = require('./config_salesforce');


//	LOAD THE REQUIRED MODULES
var request = require('request');


//  REQUEST AN ACCESS TOKEN ON INIT
var url = cfg.oauth.loginUrl;
var b = '';
b += 'grant_type=password';
b += '&client_id=' + cfg.consumerKey;
b += '&client_secret=' + cfg.clientSecret;
b += '&username=' + cfg.username;
b += '&password=' + cfg.password + cfg.securityToken;

var options = {
  	headers: {'content-type' : 'application/x-www-form-urlencoded'},
  	url:     cfg.oauth.loginUrl,
  	body:    b
};

request.post(url, options, function(error, response, body1){
	if(error){
		console.error('ADAPTER_REQUEST_SALESFORCE --> salesforce access token request --> error: ', error);
	}
	else{
		body1 = JSON.parse(body1);
		//console.log('ADAPTER_REQUEST_SALESFORCE --> salesforce access token request --> request body: ', body);
		if(typeof body1.access_token != 'undefined'){
			//	SAVE THE AUTH RESPONSE VALUES 
			cfg.set_access_token(body1.access_token);
			cfg.set_instance_url(body1.instance_url);
			cfg.set_auth_response(body1);
			console.log('ADAPTER_REQUEST_SALESFORCE --> SALESFORCE ACCESS TOKEN RECEIVED');

			//	NOW LOOKUP THE ACCOUNT INFORMATION ASSOCIATED WITH THIS ACCOUNT
			options = {
			  	url: cfg.authResponse.id,
			  	headers: {
			    	'Authorization': 'Bearer ' + cfg.accessToken
			  	}
			};
			request(options, function(error, response, body2){
				if(error){
					console.error('ADAPTER_REQUEST_SALESFORCE --> salesforce account object request --> error: ', error);
				}
				else{
					body2 = JSON.parse(body2);
					console.log('ADAPTER_REQUEST_SALESFORCE --> salesforce account object --> object received: ', body2);
					cfg.set_account_object(body2);
				}
			});
		}
		else{
			console.log('ADAPTER_REQUEST_SALESFORCE --> FAILED TO RETRIEVE SALESFORCE ACCESS TOKEN');
		}
	}
});


function get(url, callback){
	var options = {
	  	url: url,
	  	headers: {
	    	'Authorization': 'Bearer ' + cfg.accessToken
	  	}
	};

	request.get(options, function(error, response, body){
		if(error){
			console.error('SALESFORCE_REST_API --> salesforce_request() --> error: ', error);
		}
		else{
			//console.log('SALESFORCE_REST_API --> salesforce_request() --> response: ', response);
			console.log('SALESFORCE_REST_API --> salesforce_request() --> body: ', body);

			callback(body);
		}
	});
}


function post(url, data, callback){

}


module.exports = {
    get: get,
    post: post
};