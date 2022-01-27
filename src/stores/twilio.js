import { defineStore } from "pinia";
import useAxios from "src/composables/useAxios";
const useTwilioStore = defineStore('twilio', {
    state: () => {
        return {
            axiosInstance: useAxios()
        }
    },
    actions: {
        async sendAppointmentMessage(appointmentId, to, body, dateString) {
            console.log('twilio store', {appointmentId});
            return this.axiosInstance.post('/sendmessage', {
                appointmentId,
                messageBody: body,
                to,
                dateString
            });
        }
    }
})

export default useTwilioStore;