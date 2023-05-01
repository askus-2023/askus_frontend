import { useRecoilState } from 'recoil';
import { accessTokenState } from '../recoil/auth/accessToken';
import axios from 'axios';

const useToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const refreshToken = window.localStorage.getItem('refresh_token');

  const beforeRefresh = () => {
    window.localStorage.setItem('aT', accessToken);
  };

  const refresh = async () => {
    const aT = window.localStorage.getItem('aT');
    const formData = new FormData();
    formData.append('accessToken', aT);
    formData.append('refreshToken', refreshToken);

    try {
      const { data } =
        aT &&
        (await axios.post('/v1/reissue', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }));
      window.localStorage.setItem('aT', '');
      setAccessToken(data.accessToken);
      window.localStorage.setItem('refresh_token', data.refreshToken);
    } catch (e) {
      window.localStorage.setItem('aT', '');
    }
  };
  return {
    beforeRefresh,
    refresh,
  };
};

export default useToken;
