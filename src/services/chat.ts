import { API_URLS } from '@/constants/config';
import apiClient from './apiClient';

export const postImageUploadAPI = async (data: FormData) => {
  const response = await apiClient.post(API_URLS.uploadImage, data);
  return response.data;
};

export const postSpeechToTextAPI = async (data: FormData) => {
  const response = await apiClient.post(API_URLS.speechToText, data);
  return response.data;
};
