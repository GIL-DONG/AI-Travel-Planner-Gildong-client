import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { residenceTypes } from '@/types/signUp';

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: sessionStorage,
});

const idState = atom<string>({
  key: 'id',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const nameState = atom<string>({
  key: 'name',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const genderState = atom<string>({
  key: 'gender',
  default: '',
});

const ageGroupState = atom<string>({
  key: 'ageGroup',
  default: '',
});

const disabilityStatusState = atom<string>({
  key: 'disabilityStatus',
  default: '',
});

const disabilityTypeState = atom<string>({
  key: 'disabilityType',
  default: '',
});

const preferTravelStyleState = atom<string[]>({
  key: 'preferTravelStyle',
  default: [],
});

const residenceState = atom<residenceTypes | null>({
  key: 'residence',
  default: null,
});

const consentState = atom<boolean>({
  key: 'consent',
  default: false,
});

const indexState = atom<number>({
  key: 'index',
  default: 0,
});

export {
  idState,
  nameState,
  genderState,
  ageGroupState,
  disabilityStatusState,
  disabilityTypeState,
  preferTravelStyleState,
  residenceState,
  consentState,
  indexState,
};
