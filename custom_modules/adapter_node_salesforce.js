/* ADAPTER NODE-SALESFORCE: OAUTH AUTHORIZATION & QUERIES */


//  LOAD THE CONFIG MODULES
var cfg     = require('./config_salesforce');
var sf 			= require('node-salesforce');


var conn = new sf.Connection({
  oauth2 : {
    // you can change loginUrl to connect to sandbox or prerelease env. 
    // loginUrl : 'https://test.salesforce.com', 
    clientId : cfg.consumerKey,
    clientSecret : cfg.clientSecret,
    redirectUri : cfg.callbackUrl,
    grant_type: 'password'
  }
});

conn.login(cfg.username, cfg.password, function(err, userInfo) {
    if (err) { return console.error('ADAPATER_NODE_SALESFORCE --> connect() --> err: ',err); }
    // Now you can get the access token and instance URL information. 
    // Save them to establish connection next time. 
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property 
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ... 
});


function connect(){
    if(conn == null){
        
    }else{

    }
}


module.exports = {
    connect: connect,

};