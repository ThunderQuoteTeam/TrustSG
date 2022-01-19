import axios from "axios";

export default function useAxios() {
    return axios.create({
        baseURL: `${process.env.FUNCTIONS_ENDPOINT}/api`
    });
}