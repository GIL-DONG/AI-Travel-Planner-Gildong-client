import { API_URLS } from '@/constants/config';
import apiRequest from './apiRequest';

export const getTravelDetailAPI = (id: string) => {
  return apiRequest.get(`${API_URLS.travelDetails}?data_id=${id}`);
};

export const getRegisterItineraryAPI = (id: string) => {
  return apiRequest.get(`${API_URLS.registerItinerary}?itinerary_id=${id}`);
};

export const deleteItineraryAPI = (id: string) => {
  return apiRequest.delete(`${API_URLS.deleteItinerary}?itinerary_id=${id}`);
};

export const getItineraryListAPI = () => {
  return apiRequest.get(API_URLS.itineraryList);
};

export const getItineraryDetailsAPI = (id: string) => {
  return apiRequest.get(`${API_URLS.itineraryDetails}?itinerary_id=${id}`);
};

export const getPrevioustConversationAPI = (id: string) => {
  return apiRequest.get(`${API_URLS.previousConversation}?session_id=${id}`);
};

export const getKaKaoCalendarAPI = (id: string, token: string) => {
  return apiRequest.get(`${API_URLS.kakaoCalendar}?token=${token}&uuid=${id}`);
};
