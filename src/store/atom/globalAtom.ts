import { atom } from 'recoil';

const headerStatusState = atom<HeaderStatusTypes>({
  key: 'headerStatus',
  default: {
    pageName: 'AI Travel Planner 길동이',
    title: '',
  },
});

export { headerStatusState };
