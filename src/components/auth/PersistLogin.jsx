import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';
import useToken from '../../hooks/useToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken] = useRecoilState(accessTokenState);
  const { beforeRefresh, refresh } = useToken();

  useEffect(() => {
    window.addEventListener('beforeunload', beforeRefresh);
    return () => {
      window.removeEventListener('beforeunload', beforeRefresh);
    };
  });

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [accessToken, refresh]);

  return <>{isLoading ? <p>Loading ...</p> : <Outlet replace />}</>;
};

export default PersistLogin;
