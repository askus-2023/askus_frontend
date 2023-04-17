import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import SearchInput from '../common/input/SearchInput';
import TextButton from '../common/button/TextButton';
import ContainedButton from '../common/button/ContainedButton';
import AuthModal from '../auth/entry/AuthModal';
import logo from '../../assets/images/logo.png';
import icBurgerSimple from '../../assets/icons/burger-simple.svg';
import icProfile from '../../assets/icons/default-profile.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import authState from '../../recoil/auth/atom';
import scrollState from '../../recoil/scroll/atom';

const Header = () => {
  const [isOpenModal, openModal] = useState(false);
  const [phase, setPhase] = useState('');
  const [alpha, setAlpha] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [accessToken] = useRecoilState(authState);
  const [scrollTop] = useRecoilState(scrollState);
  const profileImage = window.localStorage.getItem('profile_image') ?? ''
  useEffect(() => {
    if (scrollTop < 400) {
      setAlpha(scrollTop / 400);
    } else setAlpha(1);
  }, [scrollTop]);

  return (
    <>
      <Wrapper alpha={alpha}>
        <LogoArea onClick={() => navigate('/main')}>
          <img src={logo} alt='로고' />
        </LogoArea>
        <ul className='header-action'>
          {pathname === '/main' ? (
            scrollTop > 480 && (
              <li className='header-action__search'>
                <SearchInput />
              </li>
            )
          ) : (
            <li className='header-action__search'>
              <SearchInput />
            </li>
          )}
          {accessToken ? (
            <li className='header-action__profile'>
              <ProfileWrapper>
                <img src={icBurgerSimple} alt='메뉴 아이콘' />
                <img src={profileImage ? profileImage : icProfile} alt='프로필 아이콘' />
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
      </Wrapper>
      {isOpenModal && (
        <AuthModal phase={phase} setPhase={setPhase} openModal={openModal} />
      )}
    </>
  );
};

export default React.memo(Header);

const Wrapper = styled.div`
  width: 100%;
  padding: 0 4rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ alpha }) => `rgba(255, 255, 255, ${alpha})`};
  .header-action {
    min-height: 8.4rem;
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
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: space-between;
  gap: 1.8rem;
  align-items: center;
  border: 0.1rem solid ${theme.colors.grey30};
  border-radius: 2.4rem;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;
