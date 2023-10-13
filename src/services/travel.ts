import { AxiosError } from 'axios';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/error';
import { API_URLS } from '@/constants/config';
import apiClient from './apiClient';

export const getTravelDetailAPI = async (id: string) => {
  try {
    const response = await apiClient.get(`${API_URLS.detail}?data_id=${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const getAddItineraryAPI = async (id: string) => {
  try {
    const response = await apiClient.get(
      `${API_URLS.addItinerary}?itinerary_id=${id}`,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const getAllItineraryAPI = async () => {
  try {
    const response = await apiClient.get(`${API_URLS.getAllItinerary}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const getItineraryDetailAPI = async (id: string) => {
  try {
    const response = await apiClient.get(
      `${API_URLS.getItineraryDetail}?itinerary_id=${id}`,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const getConversationAPI = async (id: string) => {
  try {
    const response = await apiClient.get(
      `${API_URLS.conversation}?session_id=${id}`,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};

export const getCalendarAPI = async (id: string, token: string) => {
  try {
    const response = await apiClient.get(
      `${API_URLS.calendar}?token=${token}&uuid=${id}`,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    alert(axiosError.response?.data.message || DEFAULT_ERROR_MESSAGE);
    return [];
  }
};
