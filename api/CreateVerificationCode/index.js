const axios = require('axios');
const $ = axios.create({
    baseURL: `${process.env.FUNCTION_APP_URL}/api`
})

function getRandomInt(max=10) {
    return Math.floor(Math.random() * max);
}

function generateOtp(length=6) {
    const numArr = Array(length).fill(0);
    for (let i = 0; i < numArr.length; i++) {
        numArr[i] = getRandomInt();
    }
    return numArr.join('');
}

module.exports = async function (context, req) {
    context.log('HTTP trigger for creating verification code and at the same time, confirming the appointment');
    const { appointmentId } = req.body;
    const otp = generateOtp();
    await $.patch('/appointments', {
        updatedBody: {
            id: appointmentId,
            verificationCode: otp,
            status: "accepted"
        }
    });
    const { data } = await $.get(`/appointments?id=${appointmentId}`);
    const { callerId, date } = data[0];
    await $.post('/sendmessage', {to: callerId, strictCustomBody: `The verification code for your call at ${date} is ${otp}`});
    const responseMessage = {otp};

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}