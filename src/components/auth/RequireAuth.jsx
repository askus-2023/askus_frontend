import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';

const RequireAuth = () => {
  const [accessToken] = useRecoilState(accessTokenState);
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to='/main' state={{ from: location }} replace />
  );
};

export default RequireAuth;
