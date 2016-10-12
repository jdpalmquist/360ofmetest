/* SOCKETIO REST API MODULE */


//	LOAD REQUIRED MODULES
var moment 		= require('moment');
var request 	= require('request');


//	LOAD CUSTOM MODULES
var cfg 		= require('./config_salesforce');


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
		console.error('REST_API_SOCKETIO --> salesforce access token request --> error: ', error);
	}
	else{
		body1 = JSON.parse(body1);
		//console.log('REST_API_SOCKETIO --> salesforce access token request --> request body: ', body);
		if(typeof body1.access_token != 'undefined'){
			//	SAVE THE AUTH RESPONSE VALUES 
			cfg.set_access_token(body1.access_token);
			cfg.set_instance_url(body1.instance_url);
			cfg.set_auth_response(body1);
			console.log('REST_API_SOCKETIO --> SALESFORCE ACCESS TOKEN RECEIVED');

			//	NOW LOOKUP THE ACCOUNT INFORMATION ASSOCIATED WITH THIS ACCOUNT
			options = {
			  	url: cfg.authResponse.id,
			  	headers: {
			    	'Authorization': 'Bearer ' + cfg.accessToken
			  	}
			};
			request(options, function(error, response, body2){
				if(error){
					console.error('REST_API_SOCKETIO --> salesforce account object request --> error: ', error);
				}
				else{
					body2 = JSON.parse(body2);
					//console.log('REST_API_SOCKETIO --> salesforce account object --> object received: ', body2);
					cfg.set_account_object(body2);
				}
			});
		}
		else{
			console.log('REST_API_SOCKETIO --> FAILED TO RETRIEVE SALESFORCE ACCESS TOKEN');
		}
	}
});



//	CREATE FUNCTIONS
//=============================================================


function create_product(socket, data){
	var ext = '/services/data/' + cfg.version + '/sobjects/Product2';
	var url = cfg.instanceUrl + ext;


	/*
		var options = {
		  	headers: {
		    	'Authorization': 'Bearer ' + cfg.accessToken,
				'content-type' : 'application/x-www-form-urlencoded',
				'content-type' : 'application/json'
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
			console.error('REST_API_SOCKETIO --> create_product() --> error: ', error);
		}
		else{
			//console.log('REST_API_SOCKETIO --> create_product() --> response: ', response);
			console.log('REST_API_SOCKETIO --> create_product() --> body: ', body);

			socket.emit('/client/create/product/response', body);
		}
	});
}


function create_order(socket, data){
	var ext = '/services/data/' + cfg.version + '/commerce/sale/order';
	var url = cfg.instanceUrl + ext;


	//console.log('DEBUG REST_API_SOCKETIO --> create_order --> account object: ', cfg.account);

	
	/*
		var options = {
		  	headers: {
		    	'Authorization': 'Bearer ' + cfg.accessToken,
				'content-type' : 'application/x-www-form-urlencoded',
				'content-type' : 'application/json'
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
			console.error('REST_API_SOCKETIO --> create_order() --> error: ', error);
		}
		else{
			//console.log('REST_API_SOCKETIO --> create_order() --> response: ', response);
			console.log('REST_API_SOCKETIO --> create_order() --> body: ', body);

			socket.emit('/client/create/order/response', body);
		}
	});
}


function create_contract(){
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
			console.error('REST_API_SOCKETIO --> create_account() --> error: ', error);
		}
		else{
			//console.log('REST_API_SOCKETIO --> create_account() --> response: ', response);
			
			//response structure:
			/*
				{
					"id":"00141000006SLyTAAW",
					"success":true,
					"errors":[]
				}
			*/
			console.log('REST_API_SOCKETIO --> create_account() --> body: ', body);

			socket.emit('/client/create/account/response', {"success": body.success, "errors": body.errors});
		}
	});
}


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
			console.error('REST_API_SOCKETIO --> create_account() --> error: ', error);
		}
		else{
			//console.log('REST_API_SOCKETIO --> create_account() --> response: ', response);
			
			//response structure:
			/*
				{
					"id":"00141000006SLyTAAW",
					"success":true,
					"errors":[]
				}
			*/
			console.log('REST_API_SOCKETIO --> create_account() --> body: ', body);

			socket.emit('/client/create/account/response', {"success": body.success, "errors": body.errors});
		}
	});
}


//	GET FUNCTIONS
//=============================================================


function get_all_accounts(socket, page){

	var ext = '/services/data/' + cfg.version + '/query/?q=SELECT Id, Name, CreatedDate FROM Account ORDER BY CreatedDate DESC';
	var url = cfg.instanceUrl + ext;
	var options = {
	  	headers: {
	  		'Authorization': 'Bearer ' + cfg.accessToken,
	  		/*
	  		'content-type' : 'application/json',
	  		'content-type' : 'application/x-www-form-urlencoded',
	  		*/

	  	},
	  	url: url,
	  	
	};

	request.get(options, function(error, response, body){
		if(error){
			console.error('REST_API_SOCKETIO --> get_accounts() --> error: ', error);
		}
		else{
			body = JSON.parse(body);
			//console.log('REST_API_SOCKETIO --> get_accounts() --> body: ', body);
			
			//response structure:
			/*
			*/

			var dest = '';
			
			//destination page: 
			switch(page){
				case "accounts":
					dest = '/client/get/accounts/response';
				break;	
				case "create_order":
					dest = '/client/get/accounts/response/create/order';
				break;
			}

			socket.emit(dest, {"response": body.done ? "success" : "failure", "data": body.records});
		}
	});
}


function get_all_contracts(){
	var ext = '/services/data/' + cfg.version + '/query/?q=SELECT Id, Name, CreatedDate FROM Contracts ORDER BY CreatedDate DESC';
	var url = cfg.instanceUrl + ext;
	var options = {
	  	headers: {
	  		'Authorization': 'Bearer ' + cfg.accessToken,
	  		/*
	  		'content-type' : 'application/json',
	  		'content-type' : 'application/x-www-form-urlencoded',
	  		*/

	  	},
	  	url: url,
	  	
	};

	request.get(options, function(error, response, body){
		if(error){
			console.error('REST_API_SOCKETIO --> get_contracts() --> error: ', error);
		}
		else{
			body = JSON.parse(body);
			//console.log('REST_API_SOCKETIO --> get_contracts() --> body: ', body);
			
			//response structure:
			/*
			*/
			
			socket.emit('/client/get/contracts/response', {"response": body.done ? "success" : "failure", "data": body.records});
		}
	});
}


function get_all_orders(socket){
	var ext = '/services/data/' + cfg.version + '/query/?q=SELECT Id, Name, CreatedDate FROM Order ORDER BY CreatedDate DESC';
	var url = cfg.instanceUrl + ext;
	var options = {
	  	headers: {
	  		'Authorization': 'Bearer ' + cfg.accessToken,
	  		/*
	  		'content-type' : 'application/json',
	  		'content-type' : 'application/x-www-form-urlencoded',
	  		*/

	  	},
	  	url: url,
	  	
	};

	request.get(options, function(error, response, body){
		if(error){
			console.error('REST_API_SOCKETIO --> get_orders() --> error: ', error);
		}
		else{
			body = JSON.parse(body);
			console.log('REST_API_SOCKETIO --> get_orders() --> body: ', body);
			
			//response structure:
			/*
			*/
			
			socket.emit('/client/get/orders/response', {"response": body.done ? "success" : "failure", "data": body.records});
		}
	});
}


function get_all_products(socket){
	var ext = '/services/data/' + cfg.version + '/query/?q=SELECT Id, Name FROM Product2';
	var url = cfg.instanceUrl + ext;
	var options = {
	  	headers: {
	  		'Authorization': 'Bearer ' + cfg.accessToken,
	  		/*
	  		'content-type' : 'application/json',
	  		'content-type' : 'application/x-www-form-urlencoded',
	  		*/

	  	},
	  	url: url,
	  	
	};

	request.get(options, function(error, response, body){
		if(error){
			console.error('REST_API_SOCKETIO --> get_products() --> error: ', error);
		}
		else{
			body = JSON.parse(body);
			//console.log('REST_API_SOCKETIO --> get_products() --> body: ', body);
			
			//response structure:
			/*
			*/
			
			socket.emit('/client/get/products/response', {"response": body.done ? "success" : "failure", "data": body.records});
		}
	});
}


//	DESCRIBE FUNCTIONS
//==================================================================================================


var describe = {
	account: function(req, res){
		var ext = '/services/data/' + cfg.version + '/sobjects/Account/describe';
		var url = cfg.instanceUrl + ext;
		var options = {
		  	headers: {
		  		'Authorization': 'Bearer ' + cfg.accessToken,
		  		/*
		  		'content-type' : 'application/json',
		  		'content-type' : 'application/x-www-form-urlencoded',
		  		*/

		  	},
		  	url: url,
		  	
		};

		request.get(options, function(error, response, body){
			if(error){
				console.error('REST_API_SOCKETIO --> describe_account() --> error: ', error);
			}
			else{
				body = JSON.parse(body);
				res.type('application/json');
				res.send(body);
			}
		});
	},
	order: function(req, res){
		var ext = '/services/data/' + cfg.version + '/sobjects/Order/describe';
		var url = cfg.instanceUrl + ext;
		var options = {
		  	headers: {
		  		'Authorization': 'Bearer ' + cfg.accessToken,
		  		/*
		  		'content-type' : 'application/json',
		  		'content-type' : 'application/x-www-form-urlencoded',
		  		*/

		  	},
		  	url: url,
		  	
		};

		request.get(options, function(error, response, body){
			if(error){
				console.error('REST_API_SOCKETIO --> describe_order() --> error: ', error);
			}
			else{
				body = JSON.parse(body);
				res.type('application/json');
				res.send(body);
			}
		});
	},
	product: function(req, res){
		var ext = '/services/data/' + cfg.version + '/sobjects/Product2/describe';
		var url = cfg.instanceUrl + ext;
		var options = {
		  	headers: {
		  		'Authorization': 'Bearer ' + cfg.accessToken,
		  		/*
		  		'content-type' : 'application/json',
		  		'content-type' : 'application/x-www-form-urlencoded',
		  		*/

		  	},
		  	url: url,
		  	
		};

		request.get(options, function(error, response, body){
			if(error){
				console.error('REST_API_SOCKETIO --> describe_product() --> error: ', error);
			}
			else{
				body = JSON.parse(body);
				res.type('application/json');
				res.send(body);
			}
		});
	},
};


module.exports = {
	on: {
		get: {
			all_accounts: get_all_accounts,
			all_contracts: get_all_contracts,
			all_orders: get_all_orders,
			all_products: get_all_products,
		},
		create: {
			account: create_account,
			contract: create_contract,
			order: create_order,
			product: create_product,
		},
		describe: describe
	}
};