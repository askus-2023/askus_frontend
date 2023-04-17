import { atom } from 'recoil';

const scrollState = atom({
  key: 'scrollState',
  default: 0,
});

export default scrollState;
