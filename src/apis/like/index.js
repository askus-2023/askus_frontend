import { api } from '../Config';

export const addLike = async ({ boardId }) => {
  const response = await api.post('v1/likes', {
    boardId,
  });
  return response;
};

export const removeLike = async ({ boardId }) => {
  const response = await api.delete('v1/likes', {
    data: { boardId },
  });
  return response;
};
