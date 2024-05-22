import axios from "axios";

const reques = axios.create({
    baseURL: 'https://phimapi.com',
    headers: { "Content-Type": "application/json" },
})

export default reques;