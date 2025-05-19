import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);