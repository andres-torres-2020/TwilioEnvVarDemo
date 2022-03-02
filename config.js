// config.js
//
// Purpose: application configuration
//   Values initialized here are used to establish a connection
//   to the Twilio APIs via a runtime client.
//
//   The values are retrieved from the application environment.
//
//   See the "development.env" as an example of the application
//   configuration values

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

//console.log(`CONFIG:\n${process.env.TWILIO_ACCOUNT_SID}`);
module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3000,
    TWILIO_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID || '',
    TWILIO_AUTH_TOKEN : process.env.TWILIO_AUTH_TOKEN || ''
}