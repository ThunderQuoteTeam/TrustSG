import { defineStore } from "pinia";
import axios from 'axios';
import qs from 'qs';
const useAuthenticationStore = defineStore('authentication', {
    state: () => {
        return {
            authBaseUrl: 'https://securemeet.thunderquote.com/',
        }
    },
    getters: {
        axiosInstance: state => {
            return axios.create({
                baseURL: state.authBaseUrl
            })
        },
        loginUrl: (state) => {
            const queryString = qs.stringify({callback: process.env.AZURE_APP_URL}); 
            return state.authBaseUrl + `app/oauth?${queryString}`
        }
    },
    actions: {
        
    }
})

export default useAuthenticationStore;