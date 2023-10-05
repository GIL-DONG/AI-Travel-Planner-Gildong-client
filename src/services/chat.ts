import { AxiosError } from 'axios';
import { API_URLS } from '@/constants/config';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/error';
import apiClient from './apiClient';

export const postChatAPI = async (data: ChatQuestionTypes) => {
  try {
    const response = await apiClient.post(`${API_URLS.mainChat}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};
