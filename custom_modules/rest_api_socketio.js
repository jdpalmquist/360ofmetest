/* SOCKETIO REST API MODULE */

var cfg 		= require('./config_salesforce');
var adapter 	= require('./adapter_request_salesforce');


function create_contract_order(socket){
	var ext = '/services/data/'+cfg.version+'/commerce/sale';
	var url = cfg.instanceUrl + ext;

	adapter.post(url, function(a,b,c,d){
		console.log('REST_API_SOCKETIO --> create_contract_order() --> results: ', {a:a, b:b, c:c, d:d});
  		socket.emit('/socketio/get/orders/response', {"data": {a:a, b:b, c:c, d:d}});
	});
}

function create_order(){
	/*
		{
			"order": [
				{
			      	"attributes": {
				      "type": "Order"
				   	},
			     	"EffectiveDate": "2013-07-11",
			      	"Status": "Draft",
			      	"billingCity": "SFO-Inside-OrderEntity-1",
			      	"accountId": "001D000000JRDAv",
			      	"Pricebook2Id": "01sD0000000G2NjIAK",
			      	"OrderItems": {
			        	"records": [
			            	{
			            		"attributes": {
					               "type": "OrderItem"
					            },
			            		"PricebookEntryId": "01uD0000001c5toIAA",
			            		"quantity": "1",
			            		"UnitPrice": "15.99"
			            	}
			        	]
			      	}
			    }
		    ]
		}
	*/

	var ext = '/services/data/' + cfg.version + '/commerce/sale/order';
	var url = cfg.instanceUrl + ext;

	adapter.post(url, data, function(a,b,c,d){
		console.log('REST_API_SOCKETIO --> create_order() --> results: ', {a:a, b:b, c:c, d:d});
  		socket.emit('/socketio/create/order/response', {"data": {a:a, b:b, c:c, d:d}});
	});
}



function get_orders_from_salesforce(socket){
	var ext = '/services/data/' + cfg.version + '/commerce/sale/order/Test1';
	var url = cfg.instanceUrl + ext;

	adapter.get(url, function(a,b,c,d){
		console.log('REST_API_SOCKETIO --> get_orders_from_salesforce() --> results: ', {a:a, b:b, c:c, d:d});
  		socket.emit('/socketio/get/orders/response', {"data": {a:a, b:b, c:c, d:d}});
	});
}


module.exports = {
	emit: {
		create_order: create_order,
	},
	on: {
		get_orders: get_orders_from_salesforce
	}
};