import { API_URLS } from '@/constants/config';
import apiRequest from './apiRequest';

export const postImageUploadAPI = (data: FormData) => {
  return apiRequest.post(API_URLS.uploadImage, data);
};

export const postSpeechToTextAPI = (data: FormData) => {
  return apiRequest.post(API_URLS.speechToText, data);
};
