import { defineStore } from "pinia";
import useAxios from "src/composables/useAxios";
const useTwilioStore = defineStore('twilio', {
    state: () => {
        return {
            axiosInstance: useAxios()
        }
    },
    actions: {
        async sendAppointmentMessage(to, body) {
            return this.axiosInstance.get('/sendmessage');
        }
    }
})

export default useTwilioStore;