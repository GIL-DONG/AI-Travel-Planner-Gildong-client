import axios, { AxiosError } from 'axios';
import { API_URLS, DEFAULT_ERROR_MESSAGE } from '@/constants/config';
import { SignUpType } from '@/types/signUp';

export const postSignUpAPI = async (formData: SignUpType) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}${API_URLS.signUp}`,
      formData,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const postCheckNickNameAPI = async (value: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}${API_URLS.checkNickName}`,
      { user_name: value },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const getSearchResidenceAPI = async (value: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${
        API_URLS.searchResidence
      }?autocomplete=${value}&page=1&page_size=10`,

      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};
