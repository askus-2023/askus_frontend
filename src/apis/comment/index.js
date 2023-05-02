import { rawApi } from '../Config';

export const getComments = async ({ boardId }) => {
  try {
    const { data } = await rawApi.get(`/v1/boards/${boardId}/replies`)
    return data
  } catch (e) {
    throw new Error(e)
  }
}

export const createComment = async ({ boardId, content }) => {
  const response = await rawApi.post(
    `/v1/boards/${boardId}/replies`, {
    content,
    },
  );
  return response;
};

export const editComment = async ({
  boardId,
  commentId,
  content,
}) => {
  const response = await rawApi.patch(
    `/v1/boards/${boardId}/replies/${commentId}`, {
    content,
    }
  );
  return response;
};

export const deleteComment = async ({ boardId, commentId }) => {
  const response = await rawApi.delete(
    `/v1/boards/${boardId}/replies/${commentId}`);
  return response;
};
