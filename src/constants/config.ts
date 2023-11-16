export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const API_URLS = {
  signIn: '/login',
  registerUser: '/users/register',
  checkNickName: '/users/check-username',
  searchResidence: '/region/autocomplete',
  mainChat: '/chatbot/main',
  itineraryChat: '/chatbot/member',
  previousConversation: '/convo',
  uploadImage: '/upload_images',
  viewImage: '/view-image/',
  speechToText: '/STT',
  travelDetails: '/data-detail',
  itineraryList: '/itinerary',
  registerItinerary: '/itinerary/registration',
  kakaoCalendar: '/itinerary/calendar',
  itineraryDetails: '/itinerary/detail',
  deleteItinerary: '/itinerary/deletion',
  deleteUser: '/users/delete-userinfo',
  modifyUserInfo: `/users/update-userinfo`,
  renewAccessToken: '/refresh-access-token',
};

export const ROUTE_PATHS = {
  home: '/',
  signIn: '/signin',
  auth: '/auth',
  signUp: '/signup',
  mainChat: '/chat',
  itineraryChat: '/chat/itinerary/:id',
  itineraryList: '/travel/itinerary',
  itineraryDetails: '/travel/itinerary/:id',
  travelDetails: '/travel/detail/:id',
  myPage: '/mypage',
  modifyUserInfo: '/mypage/update',
  error: '/*',
};
