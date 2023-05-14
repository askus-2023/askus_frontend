import axios from 'axios';
import { rawApi } from '../Config';

export const signUp = async (data) => {
  const response = await axios.post('/v1/signup', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};

export const duplicationCheck = async (data) => {
  const response = await axios.post('/v1/signup/email/duplicated', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};

export const signIn = async (data) => {
  const response = await axios.post('/v1/signin', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};

export const logout = async () => {
  try {
    const { data } = await rawApi.get('/v1/logout');
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
