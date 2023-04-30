import { api } from '../Config';

export const addLike = async ({ boardId, accessToken }) => {
  const response = await api.post(
    'v1/likes',
    {
      boardId,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response;
};

export const removeLike = async ({ boardId, accessToken }) => {
  const response = await api.delete('v1/likes', {
    data: { boardId },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};
