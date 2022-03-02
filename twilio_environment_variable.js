class twilio_environment_variable
{
    constructor(twilioClient, serviceSid, environmentSid)
    {
        this.client = twilioClient
        this.serviceSid = serviceSid
        this.environmentSid = environmentSid
    }
    async create(environmentSid, key, value)
    {
        await this.client.serverless.services(this.serviceSid)
            .environments(environmentSid)
            .variables
            .create({key: key, value: value})
            .then(variable => {
                console.log(variable.sid);
                this.variableSid = variable.sid;
            });
        return this.variableSid;
    }
    async read(environmentSid)
    {
        let varList = [];
        await this.client.serverless.services(this.serviceSid)
            .environments(environmentSid)
            .variables
            .list({limit: 20})
            .then(variables => 
                variables.forEach(v => {
                    //console.log(`VAR: sid=${v.sid}, key=${v.key}`);
                    varList.push({sid: v.sid, key: v.key, value: v.value});
                }));
        return varList;
    }
    async update(environmentSid, variableSid, key, value)
    {
        await this.client.serverless.services(this.serviceSid)
            .environments(environmentSid)
            .variables(variableSid)
            .update({value: value})
            .then(variable => console.log(`updated ${variable.sid}`));
    }
    async delete(environmentSid, variableSid)
    {
        await this.client.serverless.services(this.serviceSid)
            .environments(environmentSid)
            .variables(variableSid)
            .remove()
            .then((x) => console.log(`deleted variable sid= ${variableSid}`));
    }
}

module.exports.twilio_environment_variable = twilio_environment_variable;
