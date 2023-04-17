import { useRecoilState } from "recoil"
import authState from "../recoil/auth/atom"
import { URLEncodedApi } from "../apis/Config";

const useToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(authState);
  const refreshToken = window.localStorage.getItem('refresh_token')
  
  const beforeRefresh = () => {
    window.localStorage.setItem('aT', accessToken);
  }

  const refresh = async () => { 
    const aT = window.localStorage.getItem('aT');
    const data = new URLSearchParams({
      accessToken: aT,
      refreshToken
    })
    window.localStorage.setItem('aT', '')
    try {
      const response = await URLEncodedApi.post('v1/reissue', data)

      setAccessToken(response.data.accessToken)
      window.localStorage.setItem('refresh_token', response.data.refreshToken)
    } catch (e) {
      console.log(e)
    }
    




  }
  return {
    beforeRefresh,
    refresh
  }
}

export default useToken;