import { AxiosError } from 'axios';
import { API_URLS } from '@/constants/config';
import { SignUpType } from '@/types/signUp';
import { LIMIT } from '@/constants/signUp';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/error';
import apiClient from './apiClient';

export const postSignUpAPI = async (formData: SignUpType) => {
  try {
    const response = await apiClient.post(`${API_URLS.signUp}`, formData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const postCheckNickNameAPI = async (value: string) => {
  try {
    const response = await apiClient.post(`${API_URLS.checkNickName}`, {
      user_name: value,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const getSearchResidenceAPI = async (keyword: string, page?: number) => {
  try {
    const response = await apiClient.get(
      `${API_URLS.searchResidence}?autocomplete=${keyword}&page=${page}&page_size=${LIMIT}`,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};
