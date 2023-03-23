import React from 'react';
import styled from 'styled-components';
import SignUp from './SignUp';
import icClose from '../../../assets/icons/close.svg';
import { theme } from '../../../styles/Theme';
import SignIn from './SignIn';

const AuthModal = ({ phase, setPhase, openModal }) => {
  return (
    <Wrapper>
      <Overlay />
      <ModalWrapper>
        <Header>
          <div></div>
          <div className='modal__header-title'>
            {phase === 'signup' ? '회원가입' : '로그인'}
          </div>
          <button onClick={() => openModal(false)}>
            <img src={icClose} alt='닫기' />
          </button>
        </Header>
        <Welcome>
          <span>Cookle에 오신 것을 환영합니다.</span>
        </Welcome>
        {phase === 'signup' ? <SignUp setPhase={setPhase} /> : <SignIn />}
      </ModalWrapper>
    </Wrapper>
  );
};

export default AuthModal;

const Wrapper = styled.div``;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
`;
const ModalWrapper = styled.div`
  max-width: 44rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 0.6rem;
`;
const Header = styled.div`
  min-height: 6.4rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid ${theme.colors.grey30};

  div:first-child {
    width: 2rem;
  }

  .modal__header-title {
    font-size: 2rem;
    font-weight: bold;
    lint-height: 3rem;
  }
`;
const Welcome = styled.div`
  width: 100%;
  padding: 2rem;
  font-size: 2.2rem;
  font-weight: bold;
`;
