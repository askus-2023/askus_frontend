import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../styles/Theme'
// import SearchInput from '../input/SearchInput'
import TextButton from '../button/TextButton'
import ContainedButton from '../button/ContainedButton'
import icSearch from '../../../assets/icons/ic-search-white.svg'

const Header = () => {
  return (
    <Wrapper>
      <LogoArea>
        로고 넣기
      </LogoArea>
      <ul>
        <li>
          <SearchIcon>
            <img src={icSearch} alt='검색 아이콘' />
          </SearchIcon>
        </li>
        <li>
          <TextButton>로그인</TextButton>
        </li>
        <li>
          <ContainedButton>회원가입</ContainedButton>
        </li>
      </ul>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.div`
  width: 100%;
  padding: 0 80px;
  position: relative;
  background-color: ${theme.colors.red};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.grey30};

  ul {
    display: flex;
    padding: 20px 12px;
    gap: 8px;
    li {
      display: flex;
    }
  }
`
const LogoArea = styled.div`
  flex: 1 0 140px;
  padding: 0 12px;
`
const SearchIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-self: center;
  &:hover{
    cursor: pointer;
    background-color: ${theme.colors.green50};
    border-radius: 50%;
  }
  img {
    margin: auto;
    width: 60%;
    height: 60%;
  }

`
