export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const API_URLS = {
  login: '/login',
  signUp: '/users/register',
  checkNickName: '/users/check-username',
  searchResidence: '/region/autocomplete',
  token: '/kakao/user_info/token',
  mainChat: '/chatbot/main',
  detail: '/data-detail',
};

export const ROUTE_PATHS = {
  home: '/',
  signIn: '/signin',
  auth: '/auth',
  signUp: '/signup',
  chat: '/chat',
  detail: '/travel/detail/:id',
};
