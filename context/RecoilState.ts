import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const scrollState = atom<number>({
  key: 'scrollTop',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const prevPage = atom<string>({
  key: 'prevPage',
  default: '',
});

export const modalVisible = atom<boolean>({
  key: 'modalVisible',
  default: false,
});

export const projectId = atom<number>({
  key: 'projectId',
  default: -1,
});

export default scrollState;
