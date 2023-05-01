import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authModalState } from '../../recoil/auth/authModal';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { accessTokenState } from '../../recoil/auth/accessToken';

const RequireLoginPage = () => {
  const [, openModal] = useRecoilState(authModalState);
  const accessToken = useRecoilValue(accessTokenState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    openModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accessToken) {
      openModal(false);
      navigate(location.state.from);
    }
  }, [accessToken, location.state.from, navigate, openModal]);

  return <Wrapper></Wrapper>;
};

export default RequireLoginPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
