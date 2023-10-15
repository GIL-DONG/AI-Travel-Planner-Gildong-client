export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const API_URLS = {
  login: '/login',
  signUp: '/users/register',
  checkNickName: '/users/check-username',
  searchResidence: '/region/autocomplete',
  token: '/kakao/user_info/token',
  mainChat: '/chatbot/main',
  itineraryChat: '/chatbot/member',
  detail: '/data-detail',
  conversation: '/convo',
  getAllItinerary: '/itinerary',
  getItineraryDetail: '/itinerary/detail',
  addItinerary: '/itinerary/registration',
  calendar: '/itinerary/calendar',
  deleteUser: '/users/delete-userinfo',
  updateUserInfo: `/users/update-userinfo`,
};

export const ROUTE_PATHS = {
  home: '/',
  signIn: '/signin',
  auth: '/auth',
  signUp: '/signup',
  chat: '/chat',
  itineraryChat: '/chat/itinerary/:id',
  detail: '/travel/detail/:id',
  itinerary: '/travel/itinerary',
  itineraryDetail: '/travel/itinerary/:id',
  myPage: '/mypage',
  updateUserInfo: '/mypage/update',
};
