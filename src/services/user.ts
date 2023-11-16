import { API_URLS } from '@/constants/config';
import { ModifyUserInfoTypes } from '@/types/user';
import apiClient from './apiClient';

export const deleteUserAPI = async () => {
  const response = await apiClient.delete(API_URLS.deleteUser);
  return response;
};

export const patchModifyUserInfoAPI = async (data: ModifyUserInfoTypes) => {
  const response = await apiClient.patch(API_URLS.modifyUserInfo, data);
  return response.data;
};
