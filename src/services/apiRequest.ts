import axios, { AxiosInstance } from 'axios';
import { BASE_URL, ROUTE_PATHS } from '@/constants/config';
import { postRenewAccessTokenAPI } from './auth';

const apiRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    withCredential: true,
  },
});

apiRequest.interceptors.request.use(
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

apiRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const renewAccessToken = async () => {
        const response = await postRenewAccessTokenAPI();
        if (
          response?.data?.message === 'successfully!' &&
          response?.data?.access_token
        ) {
          localStorage.setItem('access_token', response?.data?.access_token);
        }
      };

      renewAccessToken();
    } else if (error.response?.status === 500) {
      localStorage.clear();
      window.location.href = `https://gildong.site${ROUTE_PATHS.signIn}`;
    }
    console.error('Response error:', error.response);
    return Promise.reject(error);
  },
);

export default apiRequest;
