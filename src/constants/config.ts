export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const API_URLS = {
  login: '/login',
  signUp: '/users/register',
  checkNickName: '/users/check-username',
  searchResidence: '/region/autocomplete',
};

export const ROUTE_PATHS = {
  home: '/',
  signIn: '/signin',
  auth: '/auth',
  signUp: '/signup',
};

export const DEFAULT_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';
