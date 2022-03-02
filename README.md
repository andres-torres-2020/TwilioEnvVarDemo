# TwilioEnvVarDemo

A Node.js demo app to invoke Twilio Environment and Variable APIs

[Node.JS]
-accessing env vars in node.js application:
files: config.js, development.env, package.json
see: https://medium.com/geekculture/node-js-environment-variables-setting-node-app-for-multiple-environments-51351b51c7cd

-accessing Twilio Environment and Twilio Variable APIs:
node.js modules created:
  twilio_environment.js
  twilio_environment_variable.js

https://www.twilio.com/docs/runtime/functions/variables
https://www.twilio.com/docs/runtime/functions-assets-api/api/environment
https://www.twilio.com/docs/runtime/functions-assets-api/api/variable

[demo app]
-env-test.js -- demo for Twilio Environment & Variable classes
    how to run this demo: npm run dev

setup:
  mkdir EnvVarDemo
  cd EnvVarDemo
  npm init
  npm i dotenv
  npm i twilio

run demo:
  npm run dev

