import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import SearchInput from '../common/input/SearchInput';
import TextButton from '../common/button/TextButton';
import ContainedButton from '../common/button/ContainedButton';
import AuthModal from '../auth/entry/AuthModal';
import logo from '../../assets/images/logo.png';
import icBurgerSimple from '../../assets/icons/burger-simple.svg';
import icProfile from '../../assets/icons/default-profile.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpenModal, openModal] = useState(false);
  const [phase, setPhase] = useState('');
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LogoArea onClick={() => navigate('main')}>
        <img src={logo} alt='로고' />
      </LogoArea>
      <ul className='header-action'>
        <li className='header-action__search'>
          <SearchInput />
        </li>
        {true ? (
          <li className='header-action__profile'>
            <ProfileWrapper>
              <img src={icBurgerSimple} alt='메뉴 아이콘' />
              <img src={icProfile} alt='프로필 아이콘' />
            </ProfileWrapper>
          </li>
        ) : (
          <>
            <li className='header-action__signin'>
              <TextButton
                className='header__btn header__btn-signin'
                onClick={() => {
                  openModal(true);
                  setPhase('signin');
                }}
              >
                로그인
              </TextButton>
            </li>
            <li className='header-action__signup'>
              <ContainedButton
                className='header__btn header__btn-signup'
                onClick={() => {
                  openModal(true);
                  setPhase('signup');
                }}
              >
                회원가입
              </ContainedButton>
            </li>
          </>
        )}
      </ul>
      {isOpenModal && (
        <AuthModal phase={phase} setPhase={setPhase} openModal={openModal} />
      )}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  padding: 0 4rem;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-action {
    display: flex;
    padding: 2rem 1.2rem;
    gap: 0.8rem;
    li {
      display: flex;
      flex: 1 0 auto;
    }
    .header-action__search {
      @media screen and (max-width: 1024px) {
        display: none;
      }
    }
  }
  .header__btn {
    button {
      padding: 0.85rem 1.5rem;
    }
  }
`;
const LogoArea = styled.div`
  flex: 0 1 auto;
  padding: 0 1.2rem;
  img {
    cursor: pointer;
  }
`;
const ProfileWrapper = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 1.4rem;
  background: rgba(244, 244, 244, 0.75);
  display: flex;
  justify-content: space-between;
  gap: 1.8rem;
  align-items: center;
  border: 0.1rem solid ${theme.colors.grey30};
  border-radius: 2.4rem;
  cursor: pointer;
`;
