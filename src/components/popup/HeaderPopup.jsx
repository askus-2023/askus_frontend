import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import { useNavigate } from 'react-router-dom';
import { popupMount, popupUnmount } from '../../animation/Popup';

const HeaderPopup = forwardRef(({ className }, ref) => {
  const navigate = useNavigate();

  return (
    <Wrapper className='popup-wrapper' ref={ref}>
      <ul className={`popup-wrapper__ul ${className}`}>
        <li className='my-profile'>
          <button onClick={() => navigate('/profile')}>프로필</button>
        </li>
        <li className='my-articles'>
          <button>내가 쓴 글</button>
        </li>
        <li className='my-likes'>
          <button>좋아요</button>
        </li>
        {/* <li className='logout'>
          <button>로그아웃</button>
        </li> */}
      </ul>
    </Wrapper>
  );
});
HeaderPopup.displayName = 'HeaderPopup';

export default HeaderPopup;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(0, 5rem);
  .popup-wrapper__ul {
    transform-origin: right top;
    padding: 0.6rem 0;
    background-color: white;
    border: 0.1rem solid ${theme.colors.grey30};
    border-radius: 0.6rem;
    li {
      padding: 0.6rem 10rem 0.6rem 1.2rem;
      button {
        white-space: nowrap;
        text-align: start;
      }
      &:hover {
        button {
          font-weight: bold;
        }
      }
    }
    .my-profile,
    .my-likes {
      padding-bottom: 1.2rem;
      border-bottom: 0.1rem solid ${theme.colors.grey30};
    }
    .my-articles,
    .logout {
      padding-top: 1.2rem;
    }
  }
  .popup-mount {
    animation: ${popupMount} 0.3s;
  }
  .popup-unmount {
    animation: ${popupUnmount} 0.3s;
  }
`;
