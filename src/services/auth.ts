import { API_URLS } from '@/constants/config';

import apiRequest from './apiRequest';

export const getUserInfoAPI = (token: string) => {
  return apiRequest.get(`${API_URLS.signIn}?token=${token}`);
};

export const postRenewAccessTokenAPI = () => {
  return apiRequest.post(API_URLS.renewAccessToken);
};
