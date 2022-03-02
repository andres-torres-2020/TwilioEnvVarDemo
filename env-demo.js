// env-demo.js
//
// This is a demo app to use Twilio Environment and Variable APIs

const client = require('./app_client.js').APP_CLIENT;
const twilio_environment = require('./twilio_environment.js').twilio_environment;
const twilio_environment_variable = require('./twilio_environment_variable.js').twilio_environment_variable;

let EnvServiceSid = "ZS25d338c254b17b3faac24bf9d2ce5ca2";
test_get_env(client, EnvServiceSid)
console.log('Done');

function test_get_env(client, serviceSid)
{
    let variableObj = new twilio_environment_variable(client, EnvServiceSid, null);
    let env = new twilio_environment(client, serviceSid);
    let env_list = [];
    env.read()
        .then(envList =>
        {
            console.log('get_environments for Twilio ServiceSID\n============');
            envList.forEach(e => {
                console.log(`sid: ${e.sid}, unique_name: ${e.unique_name}\n----------------------`)
        
                let vars = variableObj.read(e.sid).then(vars => {
                    vars.forEach(v => console.log(`\tvarSid=${v.sid}, var=<${v.key} : ${v.value}`))
                    })
                    .catch(err => {console.error(`var read error: ${err}`)})
            });
        });
}

function test_list_env_vars(client, serviceSid)
{
    let env = new twilio_environment(client, serviceSid);
    let variableObj = new twilio_environment_variable(client, EnvServiceSid, null);
    env.read().then(envList =>
    {
        console.log('environments\n============');
        envList.forEach(e => {
            console.log(`sid: ${e.sid}, unique_name: ${e.unique_name}\n----------------------`)

            let vars = variableObj.read(e.sid).then(vars => {
                vars.forEach(v => console.log(`\tvarSid=${v.sid}, var=<${v.key} : ${v.value}`))
                })
                .catch(err => {console.error(`var read error: ${err}`)})
        });
    });
}

function test_delete_env_var(envServiceSid, v, keyToDelete)
{
    if (v.key === keyToDelete)
    {
        variableObj.delete(envServiceSid, v.sid)
            .then(console.log(`deleted env var.sid=${v.sid} var.key=${keyToDelete}`));
    }
}
