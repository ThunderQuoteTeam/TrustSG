const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

module.exports = async function (context, req) {
    context.log('HTTP trigger for twilio');
    const body = req.body.messageBody;
    client.messages.create({
        body,
        messagingServiceSid,
        to: '+6597664983'
    })
    const responseMessage = 'success';

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}