import { API_URLS } from '@/constants/config';
import apiClient from './apiClient';

export const getTravelDetailAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.travelDetails}?data_id=${id}`,
  );
  return response.data;
};

export const getAddItineraryAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.registerItinerary}?itinerary_id=${id}`,
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
  const response = await apiClient.get(API_URLS.itineraryList);
  return response.data;
};

export const getItineraryDetailAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.itineraryDetails}?itinerary_id=${id}`,
  );
  return response.data;
};

export const getConversationAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.previousConversation}?session_id=${id}`,
  );
  return response.data;
};

export const getCalendarAPI = async (id: string, token: string) => {
  const response = await apiClient.get(
    `${API_URLS.kakaoCalendar}?token=${token}&uuid=${id}`,
  );
  return response.data;
};
