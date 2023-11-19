import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ItineraryTypes, TheTopTypes } from '@/types/travel';

const { persistAtom } = recoilPersist({
  key: 'itinerary',
  storage: sessionStorage,
});

const theTopState = atom<TheTopTypes>({
  key: 'theTop',
  default: {
    title: '',
    destinations: [],
  },
  effects_UNSTABLE: [persistAtom],
});

const tabState = atom<string>({
  key: 'tabState',
  default: '',
});

const itineraryState = atom<ItineraryTypes>({
  key: 'itinerary',
  default: {
    date_type: '',
    destinations: [],
    itinerary_id: '',
    session_id: '',
    title: '',
    timestamp: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export { theTopState, tabState, itineraryState };
