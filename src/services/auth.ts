import { API_URLS } from '@/constants/config';

import apiClient from './apiClient';

export const getUserInfoAPI = async (token: string) => {
  const response = await apiClient.get(`${API_URLS.signIn}?token=${token}`);
  return response.data;
};

export const postRefreshTokenAPI = async () => {
  const response = await apiClient.post(API_URLS.renewAccessToken);
  return response.data;
};
