import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';
import { authModalState } from '../../recoil/auth/authModal';
import HeaderPopup from '../popup/HeaderPopup';
import { throttle } from 'lodash';

const Header = () => {
  const [phase, setPhase] = useState('signin');
  const [alpha, setAlpha] = useState(0);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const profileRef = useRef(null);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accessToken = useRecoilValue(accessTokenState);
  const [isOpenModal, openModal] = useRecoilState(authModalState);
  const [isOpenPopup, openPopup] = useState(false);
  const [animation, setAnimation] = useState('popup-mount');
  const profileImage = window.localStorage.getItem('profile_img');

  const calculateAlpha = useMemo(
    () =>
      throttle(() => {
        if (window.scrollY < 300) {
          setAlpha(window.scrollY / 300);
        } else setAlpha(1);
        setScrollY(window.scrollY);
      }, 300),
    []
  );

  const closePopup = useCallback((e) => {
    const target = e.target;
    if (profileRef.current?.contains(target)) {
      setAnimation('popup-mount');
      openPopup(true);
    } else {
      setAnimation('popup-unmount');
      setTimeout(() => openPopup(false), 200);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', calculateAlpha, { passive: true });
    return () => {
      document.removeEventListener('scroll', calculateAlpha, { passive: true });
    };
  }, [calculateAlpha]);

  useEffect(() => {
    document.addEventListener('click', closePopup);
    return () => {
      document.removeEventListener('click', closePopup);
    };
  }, [closePopup]);

  return (
    <>
      <Wrapper alpha={alpha}>
        <LogoArea onClick={() => navigate('/main')}>
          <img src={logo} alt='로고' />
        </LogoArea>
        <ul className='header-action'>
          {pathname === '/main' ? (
            scrollY > 480 && (
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
              <ProfileWrapper ref={profileRef}>
                <img src={icBurgerSimple} alt='메뉴 아이콘' />
                <img
                  className='profile-image'
                  src={
                    !profileImage || profileImage === 'undefined'
                      ? icProfile
                      : profileImage
                  }
                  alt='프로필 아이콘'
                />
              </ProfileWrapper>
              {isOpenPopup && (
                <HeaderPopup ref={popupRef} className={animation} />
              )}
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

export default Header;

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
  transition: background 0.2s ease;
  background: ${({ alpha }) => `rgba(255, 255, 255, ${alpha})`};
  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.3);
  .header-action {
    min-height: 8.4rem;
    display: flex;
    padding: 2rem 1.2rem;
    gap: 0.8rem;
    li {
      display: flex;
      flex: 1 0 auto;
    }
    .header-action__profile {
      position: relative;
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
  .profile-image {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;
