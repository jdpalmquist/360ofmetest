/* CLIENT REST API MODULE */

var Db = require('./database');


/**/
function get_orders(req, res){
	//var params = req.body;

	var query = {};

	Db.orders.find(query, function(err, data){
		if(err){
			console.log('ERROR: ', err);
			res.send({
				response: "failed",
				reason: "Database error"
			});
		}
		else{
			if(data.length > 0){
				res.send({
					response: "success",
					data: data
				});				
			}
			else{
				//empty result set
				res.send({
					response: "success",
					data: []
				});
			}
		}
	});
}


/**/
function get_order(){

}


/**/
function create_order(){

}


module.exports = {
	get_orders: get_orders,
	get_order: get_order,
	create_order: create_order,
};