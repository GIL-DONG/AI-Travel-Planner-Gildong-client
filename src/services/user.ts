import { AxiosError } from 'axios';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/error';
import apiClient from './apiClient';

export const DeleteUserAPI = async () => {
  try {
    const response = await apiClient.delete(`/users/delete-userinfo`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const PatchUserAPI = async (data: string) => {
  try {
    const response = await apiClient.patch(`/users/update-userinfo`, {
      data,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};
