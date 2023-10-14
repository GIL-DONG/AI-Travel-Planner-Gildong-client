import { atom } from 'recoil';
import { itineraryTypes } from '@/types/travel';

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

const destinationsState = atom<string[]>({
  key: 'destinationsState',
  default: [],
});

const titileState = atom<string>({
  key: 'titileState',
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
});

export {
  dateTypeState,
  itineraryIdState,
  sessionIdState,
  destinationsState,
  titileState,
  itineraryState,
};
