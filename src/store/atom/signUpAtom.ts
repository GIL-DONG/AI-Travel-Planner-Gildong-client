import { atom } from 'recoil';
import { residenceType } from '@/types/signUp';

const idState = atom<string>({
  key: 'idState',
  default: '',
});

const nameState = atom<string>({
  key: 'nameState',
  default: '',
});

const genderState = atom<string>({
  key: 'genderState',
  default: '',
});

const ageGroupState = atom<string>({
  key: 'ageGroupState',
  default: '',
});

const disabilityStatusState = atom<string>({
  key: 'disabilityStatusState',
  default: '',
});

const disabilityTypeState = atom<string>({
  key: 'disabilityTypeState',
  default: '',
});

const preferTravelStyleState = atom<string[]>({
  key: 'preferTravelStyleState',
  default: [],
});

const residenceState = atom<residenceType | null>({
  key: 'residenceState',
  default: null,
});

const indexState = atom<number>({
  key: 'indexState',
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
  indexState,
};
