import axios from 'axios';
import { formDataApi } from '../Config';

export const upload = async ({ data, accessToken }) => {
  const response = await formDataApi.post('/v1/boards', data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export const getDetail = async ({ id, accessToken }) => {
  try {
    const { data } = await axios.get(`/v1/boards/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getList = async ({ tag, dateLoe, dateGoe, sortTarget }) => {
  try {
    const { data } = await axios.get(`/v1/boards`, {
      params: {
        tag,
        dateLoe,
        dateGoe,
        sortTarget,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
