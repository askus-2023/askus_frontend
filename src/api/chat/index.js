import { rawApi } from '../Config';

export const chat = async ({ question }) => {
  const response = await rawApi.post('/v1/chats', {
    question,
  });
  return response.data;
};
