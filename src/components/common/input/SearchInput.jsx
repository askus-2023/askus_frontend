import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';
import icSearch from '../../../assets/icons/ic-search-white.svg';

const SearchInput = ({ className }) => {
  return (
    <Wrapper className={className}>
      <InputEl />
      <button>
        <img src={icSearch} alt='검색 아이콘' />
      </button>
    </Wrapper>
  );
};

export default SearchInput;

const Wrapper = styled.div`
  position: relative;
  max-width: 360px;
  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 33px;
    height: 33px;
    padding: 8px;
    border-radius: 50%;
    background-color: ${theme.colors.green50};
    transform: translate(-5px, 5px);
    &:hover {
      background-color: ${theme.colors.green70};
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
const InputEl = styled.input`
  width: 100%;
  padding: 12px 45px 12px 18px;
  font-size: 16px;
  border: 1px solid ${theme.colors.grey30};
  border-radius: 24px;
  &:focus {
    border-color: ${theme.colors.grey90};
  }
`;
