import { defineStore } from "pinia";
import useAxios from "src/composables/useAxios";
const useVerificationStore = defineStore('verification', {
    state: () => {
        return {
            axiosInstance: useAxios()
        }
    },
    actions: {
        async createVerificationCode(appointmentId) {
            return this.axiosInstance.post('/createverificationcode', {appointmentId});
        }
    }
})

export default useVerificationStore;