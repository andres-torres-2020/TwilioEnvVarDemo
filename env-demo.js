// env-demo.js
//
// This is a demo app to use Twilio Environment and Variable APIs

const client = require('./app_client.js').APP_CLIENT;
const twilio_environment = require('./twilio_environment.js').twilio_environment;
const twilio_environment_variable = require('./twilio_environment_variable.js').twilio_environment_variable;
//const appFlow = new Promise(DemoApp)
//appFlow.then(x => console.log('Done'))
DemoClosureApp();

function DemoClosureApp()
{
    let ServiceSid = "ZS25d338c254b17b3faac24bf9d2ce5ca2";
    let f = new closureTestGetEnvironment(client, ServiceSid);
    f.readEnvironment(environments => {
        console.log(`getEnvironments for Twilio ServiceSID=${ServiceSid}\n============`);
        environments.forEach(e => console.log(`Environment: {sid: ${e.sid}, unique_name: ${e.unique_name}}`))
    })
    console.log(`done: ${JSON.stringify(f)}`)
}

function closureTestGetEnvironment(client, serviceSid)
{
    let env = new twilio_environment(client, serviceSid);
    this.readEnvironment = function reader(ProcessorCallback)
    {
        env.read()
            .then(envList => ProcessorCallback(envList))
    }
}

function DemoApp()
{
    let ServiceSid = "ZS25d338c254b17b3faac24bf9d2ce5ca2";
    let EnvironmentSid = "ZE7e5c5a7c731bdea7940b9055b19a1d91";
    testCreateVariable(ServiceSid, EnvironmentSid);
    testGetEnvironment(client, ServiceSid)

    let VariableSid = "ZV73b81fe69ef8bbd27e7f4d2bb217d825";
    testDeleteVariable(ServiceSid, EnvironmentSid, VariableSid);
    testGetEnvironment(client, ServiceSid);

    let updateVariableSid = "ZV582bcbb756a10d4a1c4f94746ecd85f0";
    testUpdateVariable(ServiceSid, EnvironmentSid, updateVariableSid, "r2-potatu");
    testGetEnvironment(client, ServiceSid);
}

function testCreateVariable(serviceSid, environmentSid)
{
    let variableKey = "newKey999111sss"
    let variableValue = "newValue"
    let variableObj = new twilio_environment_variable(client, serviceSid, environmentSid, null);
    variableObj.create(environmentSid, variableKey, variableValue)
        .then(variable => {
            console.log(`variable created: ${JSON.stringify(variable)}`)
        })
        .catch(err => console.log(`variable creation failed: ${err}`));
}

function testUpdateVariable(serviceSid, environmentSid, variableSid, variableValue)
{
    let variableObj = new twilio_environment_variable(client, serviceSid, null);
    variableObj.update(environmentSid, variableSid, variableValue)
        .then((some_promise) => {
            console.log(`variable updated: ${variableSid}`)
        })
        .catch(err => console.log(`variable update failed: ${err}`));
}

function testDeleteVariable(serviceSid, environmentSid, variableSid)
{
    let variableObj = new twilio_environment_variable(client, serviceSid, null);
    variableObj.delete(environmentSid, variableSid)
        .then((some_promise) => {
            console.log(`variable deleted: ${variableSid}`)
        })
        .catch(err => console.log(`variable deletion failed: ${err}`));
}

async function testGetEnvironment(client, serviceSid)
{
    let variableObj = new twilio_environment_variable(client, serviceSid, null);
    let env = new twilio_environment(client, serviceSid);
    let variableList = [];
    await env.read()
        .then(envList =>
        {
            console.log(`get_environments for Twilio ServiceSID=${serviceSid}\n============`);
            envList.forEach(e => {
                console.log(`Environment: {sid: ${e.sid}, unique_name: ${e.unique_name}}\n----------------------`)
        
                variableObj.read(e.sid).then(vars => {
                    vars.forEach(v => {
                        console.log(`\tvarSid=${v.sid}, key:${v.key}, value:${v.value}`);
                        variableList.push(v);
                        })
                    })
                    .catch(err => {console.error(`var read error: ${err}`)})
            });
        })
        .finally(()=>{
            console.log(`variableList.length=${variableList.length}`);
            variableList.forEach(v => {console.log(`\t\tvarSid=${v.sid}, key:${v.key}, value:${v.value}`);})
        });
    return variableList;
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
