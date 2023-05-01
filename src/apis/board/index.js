import { api, formDataApi } from '../Config';

export const upload = async ({ data }) => {
  const response = await formDataApi.post('/v1/boards', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};

export const getBoardDetail = async ({ id }) => {
  try {
    const { data } = await api.get(`/v1/boards/${id}`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getBoardList = async ({ tag, dateLoe, dateGoe, sortTarget }) => {
  try {
    const { data } = await api.get(`/v1/boards`, {
      params: {
        tag,
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
