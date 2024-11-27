'use client'
import axios from "axios";
import { API_URL, ACCESS_TOKEN, REFRESH_TOKEN } from "./utils";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                const detail = error.response.data?.detail;

                if (detail === "Invalid credentials") {
                    error.message = "Incorrect username or password. Please try again.";
                } else if (detail === "Token has expired") {
                    error.message = "Your session has expired. Please log in again.";
                } else {
                    error.message = "Incorrect username or password. Please try again.";
                }
            } else if (status === 403) {
                error.message = "You don't have permission to access this resource.";
            } else if (status === 500) {
                error.message = "An error occurred on the server. Please try again later.";
            } else {
                error.message = error.response.data?.message || "An unexpected error occurred.";
            }
        } else if (error.request) {
            error.message = "No response from the server. Please check your network connection.";
        } else {
            error.message = "An error occurred while setting up the request.";
        }

        return Promise.reject(error);
    }
);

export default api;
