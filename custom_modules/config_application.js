/* CONFIG_APPLICATION.JS -- configuration file for the application */


/**
	This cfg object is designed to be the actual data store in memory for the application configuration
*/
var cfg = {
	is_dev: false,
	port: process.env.PORT || 8080,
};


function is_dev(){
	return cfg.is_dev;
}


function get_port_num(){
	return cfg.port;
}


function print_server_running_msg(){
	console.log('server.js now running on port #', get_port_num());
}



module.exports = {
	get: {
		is_dev: is_dev,
		port: get_port_num,
	},
	print: {
		server_start: print_server_running_msg,
	}
};