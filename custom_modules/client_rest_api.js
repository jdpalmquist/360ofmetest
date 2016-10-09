/* CLIENT REST API MODULE */

var Db = require('./database');



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
			res.send({
				response: "success",
				data: data
			});
		}
	});
}



module.exports = {
	get_orders: get_orders
};