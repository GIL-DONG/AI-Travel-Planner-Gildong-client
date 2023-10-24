import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'chat',
  storage: sessionStorage,
});

const sessionIdState = atom<string>({
  key: 'sessionId',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const itineraryIdState = atom<string>({
  key: 'itineraryId',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const pageState = atom<string>({
  key: 'page',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const mainChatListState = atom<ChatTypes[]>({
  key: 'mainChatList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export { sessionIdState, itineraryIdState, pageState, mainChatListState };
