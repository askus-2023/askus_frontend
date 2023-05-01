import axios from 'axios';
import { formDataApi, rawApi } from '../Config';

export const viewProfile = async ({ accessToken }) => {
  try {
    const response = await axios.get('/v1/profiles', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const editPassword = async ({ accessToken, passwordData }) => {
  try {
    const data = JSON.stringify(passwordData);
    const response = await rawApi.patch('/v1/profiles/password', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const editProfile = async ({ accessToken, profileData }) => {
  try {
    const response = await formDataApi.patch('/v1/profiles', profileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
