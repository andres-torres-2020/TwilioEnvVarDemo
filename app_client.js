//app_client.js
//
// javascript modularization for the Twilio runtime client
//
// the authentication details are retrieved by config.js

const config =  require('./config.js');
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;

module.exports = {
  APP_CLIENT : require('twilio')(accountSid, authToken)
}