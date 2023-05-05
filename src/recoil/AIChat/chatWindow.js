import { atom } from 'recoil';

export const chatWindowState = atom({
  key: 'chatWindowState',
  default: {
    button: true,
    chatWindow: false,
  },
});
