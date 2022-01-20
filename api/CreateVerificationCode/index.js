function getRandomInt(max=10) {
    return Math.floor(Math.random() * max);
}

function generateOtp(length=8) {
    const numArr = Array(length).fill(0);
    for (let i = 0; i < numArr.length; i++) {
        numArr[i] = getRandomInt();
    }
    return parseInt(numArr.join(''), 10);
}

module.exports = async function (context, req) {
    context.log('HTTP trigger for creating verification code');
    const otp = generateOtp();
    const responseMessage = {otp};

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}