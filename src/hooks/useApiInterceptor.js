import axios from "axios"
import { useRecoilValue } from "recoil"
import { accessTokenState } from "../recoil/auth/accessToken"
import useToken from "./useToken"
import { useEffect } from "react"

const useApiInterceptor = () => {
  const accessToken = useRecoilValue(accessTokenState)
  const { refresh } = useToken()

  useEffect(() => {
    
  }, [accessToken, refresh])

  return axios
}

export default useApiInterceptor