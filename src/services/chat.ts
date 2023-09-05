import { ROUTE_PATHS } from '@constants/config';
import { AxiosError } from 'axios';
import { DEFAULT_ERROR_MESSAGE } from '@constants/error';
import apiClient from './apiClient';

export const postChatAPI = async (data: ChatDataTypes) => {
  try {
    const response = await apiClient.post(`${ROUTE_PATHS.chat}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};
