/* SOCKETIO REST API MODULE */

var salesforce 	= require('./rest_api_salesforce');


function get_orders_from_salesforce(socket){
	salesforce.get_orders();

  	var orders = [
  		{number: 1, items: ['apple', 'pear', 'lemon']},
  		{number: 2, items: ['onions', 'lettuce', 'celery']}
  	];
  	socket.emit('/socketio/get/orders/response', {"orders": orders});
}


module.exports = {
	on: {
		get_orders_from_salesforce: get_orders_from_salesforce
	}
};