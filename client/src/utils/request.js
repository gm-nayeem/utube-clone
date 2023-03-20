import axios from "axios";

const BASE_URL = "http://localhost:8800/api";

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: JSON.parse(localStorage.getItem("persist:root")).user && {token: `Bearer ${
        JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.token
    }`}
});


