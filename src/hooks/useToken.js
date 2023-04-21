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
    const data = new URLSearchParams({
      accessToken: aT,
      refreshToken,
    });
    window.localStorage.setItem('aT', '');
    try {
      const response = await URLEncodedApi.post('v1/reissue', data);

      setAccessToken(response.data.accessToken);
      window.localStorage.setItem('refresh_token', response.data.refreshToken);
    } catch (e) {}
  };
  return {
    beforeRefresh,
    refresh,
  };
};

export default useToken;
