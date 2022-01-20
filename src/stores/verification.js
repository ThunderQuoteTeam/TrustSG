import { defineStore } from "pinia";
import useAxios from "src/composables/useAxios";
const useVerificationStore = defineStore('verification', {
    state: () => {
        return {
            axiosInstance: useAxios()
        }
    },
    actions: {
        async createVerificationCode() {
            return this.axiosInstance.post('/createverificationcode');
        }
    }
})

export default useVerificationStore;