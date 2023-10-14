import { ROUTE_PATHS } from './config';

export const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
export const JAVASCRIPT_KEY = import.meta.env.VITE_APP_JAVASCRIPT_KEY;
export const REDIRECT_URL = `${import.meta.env.VITE_APP_CLIENT_URL}${
  ROUTE_PATHS.auth
}`;
