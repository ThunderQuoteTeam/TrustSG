const { ServiceBusClient } = require("@azure/service-bus");
const sbClient = new ServiceBusClient(process.env.AzureWebJobsServiceBus);
const queueName = "twilio-message";
const sender = sbClient.createSender(queueName);

module.exports = async function (context, req) {
    context.log('HTTP trigger for enqueuing message');
    const dateString = req.body.dateString;
    const enqueueTime = new Date(dateString);
    enqueueTime.setMinutes(enqueueTime.getMinutes() - 15); // send 15 mins before
    // follows this interface https://docs.microsoft.com/en-us/javascript/api/@azure/service-bus/servicebusmessage?view=azure-node-latest
    const sampleMessage = {
        body: {
            to: req.body.to,
            dateString,
            messageBody: req.body.messageBody
        },
        scheduledEnqueueTimeUtc: enqueueTime
    };
    await sender.sendMessages(sampleMessage);

    const responseMessage = 'success';

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}