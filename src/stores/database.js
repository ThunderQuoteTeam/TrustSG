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
            return this.axiosInstance.get('/appointments');
        }
    }
})

export default useDatabaseStore;