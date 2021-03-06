/* DATABASE.JS -- wrapper module for database related tasks */


//	DATABASE EXPORT OBJECT
var db = {
	orders: null,
};

//	REQUIRED LIBRARIES
var Mongoose = require('mongoose');


//	CUSTOM REQUIRED MODULES
var Cfg = require('./config_database');


//	IMPORT SCHEMAS
var Order = require('./schemas/order_schema');


//	OPEN A CONNECTION TO MONGODB
var conn = Mongoose.createConnection(Cfg.get.conn_str());


//	PROCESS SCHEMAS INTO MODELS
db.orders = conn.model("orders", Order.schema);


//	EXPORT THE DATABASE OBJECT WITH THE ATTACHED MODELS
module.exports = db;