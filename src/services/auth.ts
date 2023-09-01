import { API_URLS, DEFAULT_ERROR_MESSAGE } from '@constants/config';
import axios, { AxiosError } from 'axios';
import { REDIRECT_URL, REST_API_KEY } from '@constants/auth';
import apiClient from './apiClient';

export const postKakaoAPI = async (code: string) => {
  try {
    const response = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      {
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URL,
        code: code,
      },
      {
        headers: { 'Content-Type': `application/x-www-form-urlencoded` },
      },
    );
    return response.data.access_token;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const getUserInfoAPI = async (token: string) => {
  try {
    const response = await apiClient.get(
      `${API_URLS.token}?access_token=${token}`,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};