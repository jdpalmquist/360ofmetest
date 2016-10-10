/* CONFIG FOR THE NODE SALESFORCE MODULE */


/* accessToken: 'Rq63fyerwQItxo5Onm8pUc3Iz', */
var cfg = {
	baseUrl: 'https://na35.salesforce.com',
	username: 'jesse.palmquist@gmail.com',
	password: 'extra_donuts29',
	version: 'v37.0',
	consumerKey: '3MVG9szVa2RxsqBYqQu6WR_.UL9QcwSn5O1GRLwujJGH8GE5kVmAyHM4tDkNg.IaFhSbdh6a0dXeTrp9Evcyq',
	clientSecret: '1817652008137562080',
	accessToken: '',
	instanceUrl: 'https://na35.salesforce.com',
};

cfg['set_access_token'] = function(token){
	if(typeof token != 'undefined'){
		cfg.accessToken = token;
	}
};

cfg['set_instance_url'] = function(url){
	if(typeof url != 'undefined'){
		cfg.instanceUrl = url;
	}
};


module.exports = cfg;