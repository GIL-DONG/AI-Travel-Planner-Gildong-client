import { API_URLS } from '@/constants/config';
import { updateUserInfoType } from '@/types/user';
import apiClient from './apiClient';

export const deleteUserAPI = async () => {
  const response = await apiClient.delete(API_URLS.deleteUser);
  return response;
};

export const patchUserAPI = async (data: updateUserInfoType) => {
  const response = await apiClient.patch(API_URLS.updateUserInfo, data);
  return response.data;
};
