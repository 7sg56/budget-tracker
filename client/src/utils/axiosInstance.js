import axios from 'axios';
import { BASE_URL } from './apiPaths.js';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Redirect to login
                window.location.href = '/login';
            } else if (error.response.status === 500) {
                console.error('Server error occurred, please try again later.');
            } 
        } else if (error.code === 'ECONNABORTED') {
            console.error('Request timed out, please try again later.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
