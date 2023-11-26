import { API_URLS } from '@/constants/config';
import { ModifyUserInfoTypes } from '@/types/user';
import apiRequest from './apiRequest';

export const deleteUserAPI = () => {
  return apiRequest.delete(API_URLS.deleteUser);
};

export const patchModifyUserInfoAPI = (data: ModifyUserInfoTypes) => {
  return apiRequest.patch(API_URLS.modifyUserInfo, data);
};
