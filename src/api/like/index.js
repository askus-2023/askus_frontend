import { rawApi } from '../Config';

export const addLike = async ({ boardId }) => {
  const response = await rawApi.post('/v1/likes', {
    boardId,
  });
  return response;
};

export const removeLike = async ({ boardId }) => {
  const response = await rawApi.delete('/v1/likes', {
    data: { boardId },
  });
  return response;
};
