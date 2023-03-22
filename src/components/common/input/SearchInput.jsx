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
  max-width: 3.6rem;
  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 3.3rem;
    height: 3.3rem;
    padding: 0.8rem;
    border-radius: 50%;
    background-color: ${theme.colors.green50};
    transform: translate(-0.5rem, 0.5rem);
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
  padding: 1.2rem 4.5rem 1.2rem 1.8rem;
  font-size: 1.6rem;
  border: 0.1rem solid ${theme.colors.grey30};
  border-radius: 2.4rem;
  &:focus {
    border-color: ${theme.colors.grey90};
  }
`;
