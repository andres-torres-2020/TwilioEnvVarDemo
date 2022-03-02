class twilio_environment
{
    constructor(twilioClient, serviceSid)
    {
        this.client = twilioClient
        this.serviceSid = serviceSid
        this.environmentSid = null;
    }
    create(domainSuffix, uniqueName)
    {
        this.client.serverless.services(this.serviceSid)
                 .environments
                 .create({domainSuffix: domainSuffix, uniqueName: uniqueName})
                 .then(environment => {
                    this.environmentSid = environment.domainName;
                    console.log(`created domainName=${environment.domainName} \ sid=${environment.sid}`)
                 });
        return this.environmentSid;
    }
    async read()
    {
        let envList = [];
        await this.client.serverless.services(this.serviceSid)
            .environments
            .list({limit: 20})
            .then((environments) => {
                environments.forEach(e => {
                    //console.log(`ENV[${envList.length}]: sid=${e.sid} unique_name=${e.unique_name}`);
                    envList.push(e); //{sid: e.sid, unique_name: e.unique_name});
                });
                // console.log(`\tENV[${envList.length}]`);
            })
            .catch(e => {console.error(`read: ${e}`)})
        // console.log(`\txENV[${envList.length}]`);
        return envList;
    }
}
module.exports.twilio_environment = twilio_environment;