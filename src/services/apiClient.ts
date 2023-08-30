import { BASE_URL } from '@constants/config';
import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default apiClient;
