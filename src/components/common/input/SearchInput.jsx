import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../../Styles/Theme';
import icSearch from '../../../Assets/Icons/search-white.svg';

const SearchInput = ({ className, placeholder, alwaysVisible }) => {
  return (
    <Wrapper className={className}>
      <FormEl>
        <InputEl
          type='search'
          alwaysVisible={alwaysVisible}
          placeholder={placeholder}
        />
        <button>
          <img src={icSearch} alt='검색 아이콘' />
        </button>
      </FormEl>
    </Wrapper>
  );
};

export default SearchInput;

const Wrapper = styled.div`
  max-width: 64rem;
`;
const FormEl = styled.form`
  position: relative;
  &:hover input {
    width: 100%;
    visibility: visible;
    padding-right: 4.5rem;
  }
  &:hover button {
    background-color: ${theme.colors.green50};
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    transform: translate(-0.4rem, 0.45rem);
    transition: background-color 0.5s ease;
    background-color: rgba(224, 224, 224, 0.4);
  }
`;
const InputEl = styled.input`
  ${({ alwaysVisible }) =>
    alwaysVisible
      ? css`
          width: 100%;
          padding-right: 4.5rem;
        `
      : css`
          width: 4.2rem;
          visibility: hidden;
          transition: all 0.5s ease;
        `}
  padding: 1.2rem 2.4rem 1.2rem 1.8rem;
  font-size: 1.6rem;
  border: 0.1rem solid ${theme.colors.grey30};
  border-radius: 2.4rem;
  float: right;
  &:active,
  :focus {
    width: 100%;
    visibility: visible;
    padding-right: 4.5rem;
  }
  &:focus ~ button {
    background-color: ${theme.colors.green50};
  }
`;
