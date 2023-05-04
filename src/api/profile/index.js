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
    alert('비밀번호가 수정되었습니다.');
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const editProfile = async ({ accessToken, data }) => {
  try {
    const response = await axios.patch('/v1/profiles', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'multipart/form-data',
      },
    });
    alert('프로필이 수정되었습니다.');
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const viewProfileBoardLike = async ({ accessToken, params }) => {
  try {
    const response = await axios.get('/v1/profiles', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `application/x-www-form-urlencoded`,
      },
      params: {
        board: params,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
