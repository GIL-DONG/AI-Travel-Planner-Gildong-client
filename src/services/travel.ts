import { API_URLS } from '@/constants/config';
import apiClient from './apiClient';

export const getTravelDetailAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.travelDetails}?data_id=${id}`,
  );
  return response.data;
};

export const getRegisterItineraryAPI = async (id: string) => {
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

export const getItineraryListAPI = async () => {
  const response = await apiClient.get(API_URLS.itineraryList);
  return response.data;
};

export const getItineraryDetailsAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.itineraryDetails}?itinerary_id=${id}`,
  );
  return response.data;
};

export const getPrevioustConversationAPI = async (id: string) => {
  const response = await apiClient.get(
    `${API_URLS.previousConversation}?session_id=${id}`,
  );
  return response.data;
};

export const getKaKaoCalendarAPI = async (id: string, token: string) => {
  const response = await apiClient.get(
    `${API_URLS.kakaoCalendar}?token=${token}&uuid=${id}`,
  );
  return response.data;
};
