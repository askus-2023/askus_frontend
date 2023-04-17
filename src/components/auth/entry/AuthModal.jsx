import React from 'react';
import styled from 'styled-components';
import SignUp from './SignUp';
import icClose from '../../../assets/icons/close.svg';
import { theme } from '../../../styles/Theme';
import SignIn from './SignIn';

const AuthModal = ({ phase, setPhase, openModal }) => {
  return (
    <Wrapper>
      <Overlay className='overlay' />
      <ModalWrapper>
        <Header>
          <div />
          <div className='modal__header-title'>
            {phase === 'signup' ? '회원가입' : '로그인'}
          </div>
          <button onClick={() => openModal(false)}>
            <img src={icClose} alt='닫기' />
          </button>
        </Header>
        <InputForm>
          <Welcome>
            <span>Cookle에 오신 것을 환영합니다.</span>
          </Welcome>
          {phase === 'signup' ? (
            <SignUp setPhase={setPhase} />
          ) : (
            <SignIn openModal={openModal} />
          )}
          <Toggle>
            {phase === 'signup' ? (
              <>
                이미 계정이 있으신가요?{' '}
                <button onClick={() => setPhase('signin')}>로그인</button>
              </>
            ) : (
              <>
                아직 Cookle을 이용해본 적이 없으신가요?{' '}
                <button onClick={() => setPhase('signup')}>가입하기</button>
              </>
            )}
          </Toggle>
        </InputForm>
      </ModalWrapper>
    </Wrapper>
  );
};

export default AuthModal;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
`;
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
  padding-bottom: 2.4rem;
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
  text-align: center;
`;
const Toggle = styled.div`
  font-size: 1.2rem;
  text-align: center;
  button {
    font-weight: bold;
    cursor: pointer;
  }
`;
const InputForm = styled.div`
  max-height: calc(100vh - 180px);
  overflow-y: auto;
`;
