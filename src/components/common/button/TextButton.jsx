import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';

const TextButton = ({ type, className, children, onClick }) => {
  return (
    <Wrapper className={className}>
      <button type={type ?? 'button'} onClick={onClick}>
        {children}
      </button>
    </Wrapper>
  );
};

export default TextButton;

const Wrapper = styled.div`
  border: none;
  border-radius: 0.6rem;
  display: flex;
  flex-shrink: 0;

  button {
    padding: 1.2rem 1.5rem;
    color: ${theme.colors.green50};
    font-size: 1.8rem;
    font-weight: bold;
    &:hover {
      border-radius: 0.6rem;
      background-color: ${theme.colors.green10};
    }
  }
`;
