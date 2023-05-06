import { rawApi, formDataApi } from '../Config';

export const createBoard = async ({ data }) => {
  const response = await formDataApi.post('/v1/boards', data);
  return response;
};

export const getBoardDetail = async ({ boardId }) => {
  try {
    const { data } = await rawApi.get(`/v1/boards/${boardId}`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getBoardList = async ({
  tag,
  title,
  dateLoe,
  dateGoe,
  sortTarget,
}) => {
  try {
    const { data } = await rawApi.get(`/v1/boards`, {
      params: {
        tag,
        title,
        dateLoe,
        dateGoe,
        sortTarget,
      },
    });
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const editBoard = async ({ boardId, data }) => {
  const response = await formDataApi.patch(`/v1/boards/${boardId}`, data);
  return response;
};

export const deleteBoard = async ({ boardId }) => {
  const response = await rawApi.delete(`/v1/boards`, {
    data: { boardIds: [boardId] },
  });
  return response;
};
