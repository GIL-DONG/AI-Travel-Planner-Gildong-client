import { API_URLS } from '@/constants/config';
import { SignUpTypes } from '@/types/signUp';
import { LIMIT } from '@/constants/signUp';
import apiRequest from './apiRequest';

export const postRegisterUserAPI = (formData: SignUpTypes) => {
  return apiRequest.post(API_URLS.registerUser, formData);
};

export const postCheckNickNameAPI = (value: string) => {
  return apiRequest.post(API_URLS.checkNickName, {
    user_name: value,
  });
};

export const getSearchResidenceAPI = (keyword: string, page?: number) => {
  return apiRequest.get(
    `${API_URLS.searchResidence}?autocomplete=${keyword}&page=${page}&page_size=${LIMIT}`,
  );
};
