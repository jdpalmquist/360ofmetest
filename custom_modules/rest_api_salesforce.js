/* SALESFORCE REST API */


//	LOAD THE CONFIG MODULES
var cfg 		= require('./config_salesforce');


// 	LOAD REQUIRED LIBRARIES
var request 	= require('request');


//
function oauth_callback(){

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



function create_order_callback(req, res){

}


module.exports = {
	oauth_callback: oauth_callback,
	get_orders: get_orders,
	create_order_callback: create_order_callback
};