const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

// const { ServiceBusClient } = require("@azure/service-bus");
// const sbClient = new ServiceBusClient(process.env.AzureWebJobsServiceBus);
// const queueName = "twilio-message";
// const receiver = sbClient.createReceiver(queueName);

// const messageHandler = async (messageReceived) => {
//     console.log(`Received message: ${messageReceived.body}`);
//     const { body, to } = JSON.parse(messageReceived.body);
//     client.messages.create({
//         body,
//         messagingServiceSid,
//         to
//     })
// };
// const errorHandler = async (error) => {
//     console.log(error);
// };
// receiver.subscribe({
//     processMessage: messageHandler,
//     processError: errorHandler
// })

module.exports = async function (context, req) {
    const { appointmentId, messageBody, to, dateString, strictCustomBody, agency, duration } = req.body;
    let body;
    if (strictCustomBody) {
        body = strictCustomBody;
    } else {
        body = `A public officer from ${agency} wants to call you at ${dateString} for approximately ${duration} minutes. Please visit this link ${process.env.CLIENT_APP_URL}/${appointmentId} to obtain a verification code. The public officer will recite this code at the start of your call. The agenda of the call is: ${messageBody}`;
    }
    client.messages.create({
        body,
        messagingServiceSid,
        to
    })

    const responseMessage = 'success';

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}