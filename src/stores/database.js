import { defineStore } from "pinia";
import useAxios from "src/composables/useAxios";
const useDatabaseStore = defineStore('database', {
    state: () => {
        return {
            axiosInstance: useAxios()
        }
    },
    actions: {
        async getAllAppointments() {
            // to get appointments by user/public officer ID
            return this.axiosInstance.get('/appointments');
        },
        async getAppointment(appointmentId) {
            return this.axiosInstance.get(`/appointments?id=${appointmentId}`);
        },
        async createAppointment(newAppointment) {
            // make sure newAppointment has the correct schema, because cosmos does not enforce
            return this.axiosInstance.post('/appointments', {newAppointment});
        }
    }
})

export default useDatabaseStore;