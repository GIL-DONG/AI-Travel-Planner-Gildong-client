import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage,
});

const kakaoTokenState = atom<string>({
  key: 'kakaoToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const isLoginState = atom<boolean>({
  key: 'isLogin',
  default: localStorage.getItem('access_token') ? true : false,
});

const nameState = atom<string>({
  key: 'name',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const userProfileImageState = atom<string>({
  key: 'userProfileImage',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const userDisabilityStatusState = atom<boolean>({
  key: 'userDisabilityStatus',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

const userDisabilityTypeState = atom<string>({
  key: 'userDisabilityType',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export {
  kakaoTokenState,
  isLoginState,
  nameState,
  userProfileImageState,
  userDisabilityStatusState,
  userDisabilityTypeState,
};
