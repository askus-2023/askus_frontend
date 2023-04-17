import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import authState from '../../recoil/auth/atom';
import useToken from '../../hooks/useToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken,] = useRecoilState(authState);
  const { beforeRefresh, refresh } = useToken()

  useEffect(() => {
    window.addEventListener('beforeunload', beforeRefresh);
    return () => {
      window.removeEventListener('beforeunload', beforeRefresh)
    }
  })

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [accessToken, refresh]);

  return <>{isLoading ? <p>Loading ...</p> : <Outlet />}</>;
};

export default PersistLogin;
