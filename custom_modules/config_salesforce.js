/* CONFIG FOR THE NODE SALESFORCE MODULE */


var cfg = {
	username: 'jesse.palmquist@gmail.com',
	password: 'extra_donuts29',
	version: 'v37.0',
	consumerKey: '3MVG9szVa2RxsqBYqQu6WR_.UL9QcwSn5O1GRLwujJGH8GE5kVmAyHM4tDkNg.IaFhSbdh6a0dXeTrp9Evcyq',
	clientSecret: '1817652008137562080',
	securityToken: 'Rq63fyerwQItxo5Onm8pUc3Iz',
	accessToken: '',
	instanceUrl: 'https://na35.salesforce.com',
	authResponse: null,
	oauth: {
		loginUrl: 'https://login.salesforce.com/services/oauth2/token',
	}
};

var account = {};


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


cfg['set_auth_response'] = function(o){
	if(typeof o != 'undefined'){
		cfg.authResponse = o;
	}
}; 


cfg['set_account_object'] = function(o){
	if(typeof o != 'undefined'){
		account = o;
	}
}; 

module.exports = cfg;