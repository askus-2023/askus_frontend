import axios from 'axios';

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
