import { API_URLS } from '@/constants/config';
import apiClient from './apiClient';

export const getTravelDetailAPI = async (id: string) => {
  const response = await apiClient.get(`${API_URLS.detail}?data_id=${id}`);
  return response.data;
};

export const getAddItineraryAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.addItinerary}?itinerary_id=${id}`,
  );
  return response.data;
};

export const deleteItineraryAPI = async (id: string) => {
  const response = await apiClient.delete(
    `${API_URLS.deleteItinerary}?itinerary_id=${id}`,
  );
  return response;
};

export const getAllItineraryAPI = async () => {
  const response = await apiClient.get(API_URLS.getAllItinerary);
  return response.data;
};

export const getItineraryDetailAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.getItineraryDetail}?itinerary_id=${id}`,
  );
  return response.data;
};

export const getConversationAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.conversation}?session_id=${id}`,
  );
  return response.data;
};

export const getCalendarAPI = async (id: string, token: string) => {
  const response = await apiClient.get(
    `${API_URLS.calendar}?token=${token}&uuid=${id}`,
  );
  return response.data;
};
