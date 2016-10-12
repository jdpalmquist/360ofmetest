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
					//console.log('ADAPTER_REQUEST_SALESFORCE --> salesforce account object --> object received: ', body2);
					cfg.set_account_object(body2);
				}
			});
		}
		else{
			console.log('ADAPTER_REQUEST_SALESFORCE --> FAILED TO RETRIEVE SALESFORCE ACCESS TOKEN');
		}
	}
});


//=============================================================


function create_order_item(){}


function create_order(socket, data){
	var ext = '/services/data/' + cfg.version + '/commerce/sale/order';
	var url = cfg.instanceUrl + ext;


	//console.log('DEBUG ADAPTER_REQUEST_SALESFORCE --> create_order --> account object: ', cfg.account);

	
	/*
		var options = {
		  	headers: {
		    	'Authorization': 'Bearer ' + cfg.accessToken
				'content-type' : 'application/x-www-form-urlencoded'
		  	},
		  	url:     url,
		  	body:    data
		};
	*/


	var options = {
	  	headers: {
	  		'Authorization': 'Bearer ' + cfg.accessToken,
	  		'content-type' : 'application/json'
	  		/*'content-type' : 'application/x-www-form-urlencoded'*/

	  	},
	  	url:     url,
	  	body:    JSON.stringify(data)
	};

	request.post(options, function(error, response, body){
		if(error){
			console.error('ADAPTER_REQUEST_SALESFORCE --> create_order() --> error: ', error);
		}
		else{
			//console.log('ADAPTER_REQUEST_SALESFORCE --> create_order() --> response: ', response);
			console.log('ADAPTER_REQUEST_SALESFORCE --> create_order() --> body: ', body);

			socket.emit('/client/create/order/response', body);
		}
	});
}


function create_contract(){}


function create_account(socket, data){
	var ext = '/services/data/' + cfg.version + '/sobjects/Account/';
	var url = cfg.instanceUrl + ext;
	var options = {
	  	headers: {
	  		'Authorization': 'Bearer ' + cfg.accessToken,
	  		'content-type' : 'application/json'
	  		/*'content-type' : 'application/x-www-form-urlencoded'*/

	  	},
	  	url:     url,
	  	body:    JSON.stringify(data)
	};

	request.post(options, function(error, response, body){
		if(error){
			console.error('ADAPTER_REQUEST_SALESFORCE --> create_account() --> error: ', error);
		}
		else{
			//console.log('ADAPTER_REQUEST_SALESFORCE --> create_account() --> response: ', response);
			
			//response structure:
			/*
				{
					"id":"00141000006SLyTAAW",
					"success":true,
					"errors":[]
				}
			*/
			console.log('ADAPTER_REQUEST_SALESFORCE --> create_account() --> body: ', body);

			socket.emit('/client/create/account/response', {"success": body.success, "errors": body.errors});
		}
	});
}


module.exports = {
    get: {

    },
    post: {
    	create_order_item: create_order_item,
    	create_order: create_order,
    	create_contract: create_contract,
    	create_account: create_account,
    }
};