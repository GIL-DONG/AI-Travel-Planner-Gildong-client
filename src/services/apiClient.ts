import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '@/constants/config';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    withCredential: true,
  },
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error.request);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response);
    return Promise.reject(error);
  },
);

export default apiClient;
