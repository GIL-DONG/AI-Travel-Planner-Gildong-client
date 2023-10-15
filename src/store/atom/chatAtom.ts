import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'chat',
  storage: sessionStorage,
});

const mainChatState = atom<ChatTypes[]>({
  key: 'mainChatState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export { mainChatState };
