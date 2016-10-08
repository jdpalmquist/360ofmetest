/* CONFIG_APPLICATION.JS -- configuration file for the application */

var cfg = {
	flags: {
		is_dev: true,
	},
	dev: {
		port: 8080,
	},
	prd: {
		port: 80,
	},
};

function get_port_num(){
	if(cfg.flags.is_dev){
		return cfg.dev.port;
	}
	else{
		return cfg.prd.port;
	}
}

function print_server_running_msg(){
	console.log('server.js now running on port #', get_port_num());
}

module.exports = {
	get: {
		port: get_port_num,
	},
	print: {
		server_start: print_server_running_msg,
	}
};