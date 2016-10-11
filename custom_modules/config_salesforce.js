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
	},
	account: {}
};


/*
EXAMPLE RESPONSE FOR ACCOUNT OBJECT

{ id: 'https://login.salesforce.com/id/00D41000000dbJrEAI/00541000000fc3BAAQ',
  asserted_user: true,
  user_id: '00541000000fc3BAAQ',
  organization_id: '00D41000000dbJrEAI',
  username: 'jesse.palmquist@gmail.com',
  nick_name: 'jesse.palmquist',
  display_name: 'Jesse Palmquist',
  email: 'jesse.palmquist@gmail.com',
  email_verified: true,
  first_name: 'Jesse',
  last_name: 'Palmquist',
  timezone: 'America/Los_Angeles',
  photos: 
   { picture: 'https://c.na35.content.force.com/profilephoto/005/F',
     thumbnail: 'https://c.na35.content.force.com/profilephoto/005/T' },
  addr_street: null,
  addr_city: null,
  addr_state: null,
  addr_country: 'US',
  addr_zip: null,
  mobile_phone: null,
  mobile_phone_verified: false,
  status: { created_date: null, body: null },
  urls: 
   { enterprise: 'https://na35.salesforce.com/services/Soap/c/{version}/00D41000000dbJr',
     metadata: 'https://na35.salesforce.com/services/Soap/m/{version}/00D41000000dbJr',
     partner: 'https://na35.salesforce.com/services/Soap/u/{version}/00D41000000dbJr',
     rest: 'https://na35.salesforce.com/services/data/v{version}/',
     sobjects: 'https://na35.salesforce.com/services/data/v{version}/sobjects/',
     search: 'https://na35.salesforce.com/services/data/v{version}/search/',
     query: 'https://na35.salesforce.com/services/data/v{version}/query/',
     recent: 'https://na35.salesforce.com/services/data/v{version}/recent/',
     profile: 'https://na35.salesforce.com/00541000000fc3BAAQ',
     feeds: 'https://na35.salesforce.com/services/data/v{version}/chatter/feeds',
     groups: 'https://na35.salesforce.com/services/data/v{version}/chatter/groups',
     users: 'https://na35.salesforce.com/services/data/v{version}/chatter/users',
     feed_items: 'https://na35.salesforce.com/services/data/v{version}/chatter/feed-items' },
  active: true,
  user_type: 'STANDARD',
  language: 'en_US',
  locale: 'en_US',
  utcOffset: -28800000,
  last_modified_date: '2016-10-08T01:46:45.000+0000',
  is_app_installed: true }
*/


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
		cfg.account = o;
	}
}; 

module.exports = cfg;