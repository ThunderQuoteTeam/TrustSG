import { defineStore } from "pinia";

export default useTwilioStore = defineStore('twilio', {
    // state: () => {
    //     return {
    //         accountSid: process.env.TWILIO_ACCOUNT_SID,
    //         token: process.env.TWILIO_AUTH_TOKEN,
    //         messageServiceSid: process.env.TWILIO_MESSAGE_SID,
    //         client: require('twilio')(this.accountSid, this.token)
    //     }
    // },
    // actions: {
    //     async sendAppointmentMessage(to, body) {
    //         return this.client.messages.create({
    //             body,
    //             messagingServiceSid: this.messageServiceSid,
    //             to
    //         })
    //     }
    // }
})