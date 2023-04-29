import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/Theme'
import { useNavigate } from 'react-router-dom'

const HeaderPopup = forwardRef(({ isOpen }, ref) => {
  const navigate = useNavigate();
  return (
    <Wrapper isOpen={isOpen} className='popup-profile' ref={ref}>
      <ul className='popup-profile__ul'>
        <li className='my-profile'>
          <button onClick={() => navigate('/profile')}>프로필</button>
        </li>
        <li className='my-articles'>
          <button>내가 쓴 글</button>
        </li>
        <li className='my-likes'>
          <button>좋아요</button>
        </li>
        <li className='logout'>
          <button>로그아웃</button>
        </li>
      </ul>
    </Wrapper>
  )
})
HeaderPopup.displayName = 'HeaderPopup'

export default HeaderPopup

const Wrapper = styled.div`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: absolute;
  top: 5rem;
  right: 0;
  background-color: white;
  border: 0.1rem solid ${theme.colors.grey30};
  border-radius: 0.6rem;
  .popup-profile__ul {
    padding: 0.6rem 0;
    li {
      padding: 0.6rem 10rem 0.6rem 1.2rem;
      button {
        white-space:nowrap;
        text-align: start;
      }
      &:hover {
        button { font-weight: bold; }
      }
    }
    .my-profile, .my-likes {
      padding-bottom: 1.2rem;
      border-bottom: 0.1rem solid ${theme.colors.grey30};
    }
    .my-articles, .logout {
      padding-top: 1.2rem;
    }
  }
`