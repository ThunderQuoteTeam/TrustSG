import axios from "axios";

export default function useAxios() {
    return axios.create({
        baseURL: `/api`
    });
}