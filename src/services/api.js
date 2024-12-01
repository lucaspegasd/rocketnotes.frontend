import axios from "axios";

export const api = axios.create({
    baseURL: "https://rocketnotes-api-o7sr.onrender.com"
});