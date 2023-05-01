import axios from 'axios';
import { aT } from '../App';

export const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

export const formDataApi = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' },
});

const requestCallback = (config) => {
  const accessToken = aT.aTGetter();
  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};
const requestErrorCallback = (error) => Promise.reject(error);
const responseCallback = (response) => response;
const responseError = async (error) => {
  const prevRequest = error?.config;
  if (
    (error?.response?.data?.type === 'NullPointerException' ||
      error?.response?.data.status === 403) &&
    !prevRequest?.sent
  ) {
    prevRequest.sent = true;
    const accessToken = aT.aTGetter();
    const refreshToken = window.localStorage.getItem('refresh_token');
    const formData = new FormData();
    formData.append('accessToken', accessToken);
    formData.append('refreshToken', refreshToken);
    const response = await axios.post('/v1/reissue', formData, {
      headers: { 'Content-Type': 'multipart/formdata' },
    });
    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    aT.newATSetter(newAccessToken);
    window.localStorage.setItem('refresh_token', newRefreshToken);

    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return prevRequest;
  }
};

api.interceptors.request.use(requestCallback, requestErrorCallback);
formDataApi.interceptors.request.use(requestCallback, requestErrorCallback);
api.interceptors.response.use(responseCallback, async (error) => {
  const prevRequest = responseError(error);
  return api(prevRequest);
});
formDataApi.interceptors.response.use(responseCallback, async (error) => {
  const prevRequest = responseError(error);
  return formDataApi(prevRequest);
});
