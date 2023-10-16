import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { destinationsTypes, itineraryTypes } from '@/types/travel';

const { persistAtom } = recoilPersist({
  key: 'itinerary',
  storage: sessionStorage,
});

const dateTypeState = atom<string>({
  key: 'dateTypeState',
  default: '',
});

const itineraryIdState = atom<string>({
  key: 'itineraryIdState',
  default: '',
});

const sessionIdState = atom<string>({
  key: 'sessionIdState',
  default: '',
});

const destinationsState = atom<destinationsTypes[]>({
  key: 'destinationsState',
  default: [],
});

const titileState = atom<string>({
  key: 'titileState',
  default: '',
});

const tabState = atom<string>({
  key: 'tabState',
  default: '',
});

const imageState = atom<string>({
  key: 'imageState',
  default: '',
});

const uploadImageState = atom<string>({
  key: 'uploadImageState',
  default: '',
});

const itineraryState = atom<itineraryTypes>({
  key: 'itineraryState',
  default: {
    date_type: '',
    destinations: [],
    itinerary_id: '',
    session_id: '',
    title: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export {
  dateTypeState,
  itineraryIdState,
  sessionIdState,
  destinationsState,
  titileState,
  tabState,
  imageState,
  uploadImageState,
  itineraryState,
};
