import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';
import { reloadState } from '../../recoil/reload';
import useToken from '../../hooks/useToken';
import Spinner from '../common/spinner/Spinner';
import styled from 'styled-components';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useRecoilState(reloadState);
  const [accessToken] = useRecoilState(accessTokenState);
  const { beforeRefresh, refresh } = useToken();

  useEffect(() => {
    window.addEventListener('pagehide', beforeRefresh);
    return () => {
      window.removeEventListener('pagehide', beforeRefresh);
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
  }, [accessToken, refresh, setIsLoading]);

  return (
    <>
      {isLoading ? (
        <Wrapper>
          <Spinner />
        </Wrapper>
      ) : (
        <Outlet replace />
      )}
    </>
  );
};

export default PersistLogin;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
