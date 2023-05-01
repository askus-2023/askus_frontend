import { rawApi } from '../Config';

export const createComment = async ({ boardId, content, accessToken }) => {
  const response = rawApi.post(
    `/v1/boards/${boardId}/replies`,
    {
      content,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response;
};

export const editComment = async ({
  boardId,
  commentId,
  content,
  accessToken,
}) => {
  const response = await rawApi.patch(
    `/v1/boards/${boardId}/replies/${commentId}`,
    {
      data: { content },
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response;
};

export const deleteComment = async ({ boardId, commentId, accessToken }) => {
  const response = await rawApi.delete(
    `/v1/boards/${boardId}/replies/${commentId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response;
};
