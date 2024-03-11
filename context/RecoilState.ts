import { atom } from 'recoil';

export const modalVisible = atom<boolean>({
  key: 'modalVisible',
  default: false,
});

export const projectId = atom<number>({
  key: 'projectId',
  default: -1,
});
