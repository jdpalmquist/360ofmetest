/* SALESFORCE REST API */


//	LOAD THE CONFIG MODULES
var cfg 		= require('./config_salesforce');


// 	LOAD REQUIRED LIBRARIES
var request 	= require('request');
var sf 			= require('node-salesforce');


var conn = new sf.Connection({
  	// you can change loginUrl to connect to sandbox or prerelease env. 
  	loginUrl : 'https://test.salesforce.com' 
});
conn.login(cfg.username, cfg.password, function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information. 
  // Save them to establish connection next time. 
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property 
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ... 
});




//
function oauth_callback(req, res){
	var params = req.body;
	console.log('SALESFORCE_REST_API --> oauth_callback() --> params: ', params);
}


//
function get_orders(){
	
	var ext = '/services/data/' + cfg.version + '/commerce/sale/order/Test1';

	var options = {
	  url: cfg.baseUrl + ext,
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
		}
	});
}


module.exports = {
	oauth_callback: oauth_callback,
	get_orders: get_orders,
};

/*
*/