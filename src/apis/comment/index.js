import { api } from '../Config';

export const create = async ({ boardId, content, accessToken }) => {
  const response = api.post(
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
