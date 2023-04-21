import { formDataApi, URLEncodedApi } from '../Config';

export const signUp = async (data) => {
  const response = await formDataApi.post('/v1/signup', data);
  return response;
};

export const duplicationCheck = async (data) => {
  const response = await URLEncodedApi.post(
    '/v1/signup/email/duplicated',
    data
  );
  return response;
};

export const signIn = async (data) => {
  const response = await URLEncodedApi.post('/v1/signin', data);
  return response;
};
