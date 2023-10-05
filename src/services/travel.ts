import { AxiosError } from 'axios';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/error';
import { API_URLS } from '@/constants/config';
import apiClient from './apiClient';

export const getTravelDetailAPI = async (id: string) => {
  try {
    const response = await apiClient.get(`${API_URLS.detail}?data_id=${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};
