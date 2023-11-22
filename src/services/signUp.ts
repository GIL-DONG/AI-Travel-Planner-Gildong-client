import { API_URLS } from '@/constants/config';
import { SignUpTypes } from '@/types/signUp';
import { LIMIT } from '@/constants/signUp';
import apiClient from './apiClient';

export const postRegisterUserAPI = async (formData: SignUpTypes) => {
  const response = await apiClient.post(API_URLS.registerUser, formData);
  return response.data;
};

export const postCheckNickNameAPI = async (value: string) => {
  const response = await apiClient.post(API_URLS.checkNickName, {
    user_name: value,
  });
  return response.data;
};

export const getSearchResidenceAPI = async (keyword: string, page?: number) => {
  const response = await apiClient.get(
    `${API_URLS.searchResidence}?autocomplete=${keyword}&page=${page}&page_size=${LIMIT}`,
  );
  return response.data;
};
