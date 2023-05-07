import { rawApi } from '../Config';

export const chat = async ({ accessToken }) => {
  const response = await rawApi.post('/v1/chats', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
