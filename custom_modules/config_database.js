/* CONFIG_DATABASE.JS -- a configuration file for the database connection */


//	REQUIRE THE APPLICATION CONFIGURATION SO THAT WE ARE USING A CENTRALIZED SOURCE OF TRUTH
var app_cfg = require('./config_application');


//	CONFIGURATION OBJECT
var cfg = {
	dev: {
		conn_str: 'mongodb://127.0.0.1:27017/360ofmetest',
	},
	prd: {
		conn_str: '',
	},
};


//	RETURNS THE APPROPRIATE MONGODB CONNECTION STRING BASED UPON CONFIG
function get_conn_str(){
	if(app_cfg.get.is_dev()){
		return cfg.dev.conn_str;
	}
	else{
		return cfg.prd.conn_str;
	}
}


//
module.exports = {
	get: {
		conn_str: get_conn_str,
	}
};