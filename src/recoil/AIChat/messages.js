import { atom } from 'recoil';

export const messagesState = atom({
  key: 'messagesState',
  default: [{ from: 'ai', content: 'AI에게 레시피를 물어보세요!' }],
});
