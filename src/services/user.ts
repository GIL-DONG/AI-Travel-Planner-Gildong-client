import { AxiosError } from 'axios';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/error';
import { API_URLS } from '@/constants/config';
import { updateUserInfoType } from '@/types/user';
import apiClient from './apiClient';

export const deleteUserAPI = async () => {
  try {
    const response = await apiClient.delete(API_URLS.deleteUser);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const patchUserAPI = async (data: updateUserInfoType) => {
  try {
    const response = await apiClient.patch(API_URLS.updateUserInfo, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};
