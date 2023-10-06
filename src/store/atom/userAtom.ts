import { atom } from 'recoil';

const isLoginState = atom<boolean>({
  key: 'isLoginState',
  default: localStorage.getItem('access_token') ? true : false,
});

const profileImageState = atom<string>({
  key: 'profileImageState',
  default: sessionStorage.getItem('profile_image') || '',
});

export { isLoginState, profileImageState };
