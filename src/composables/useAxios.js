import axios from "axios";

export default function useAxios() {
    return axios.create({
        baseURL: `${process.env.AZURE_FUNCTION_APP_URL}/api`
    });
}