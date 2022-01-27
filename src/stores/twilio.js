import { defineStore } from "pinia";
import useAxios from "src/composables/useAxios";
const useTwilioStore = defineStore('twilio', {
    state: () => {
        return {
            axiosInstance: useAxios()
        }
    },
    actions: {
        async sendAppointmentMessage(appointmentId, to, body, dateString, duration, agency) {
            return this.axiosInstance.post('/sendmessage', {
                appointmentId,
                messageBody: body,
                to,
                dateString,
                agency,
                duration
            });
        }
    }
})

export default useTwilioStore;