import { useRecoilState } from 'recoil';
import { accessTokenState } from '../recoil/auth/accessToken';
import { URLEncodedApi } from '../apis/Config';

const useToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const refreshToken = window.localStorage.getItem('refresh_token');

  const beforeRefresh = () => {
    window.localStorage.setItem('aT', accessToken);
  };

  const refresh = async () => {
    const aT = window.localStorage.getItem('aT');
    const formData = new URLSearchParams({
      accessToken: aT,
      refreshToken,
    });
    window.localStorage.setItem('aT', '');
    try {
      const { data } = await URLEncodedApi.post('/v1/reissue', formData);

      setAccessToken(data.accessToken);
      window.localStorage.setItem('refresh_token', data.refreshToken);
    } catch (e) {}
  };
  return {
    beforeRefresh,
    refresh,
  };
};

export default useToken;
