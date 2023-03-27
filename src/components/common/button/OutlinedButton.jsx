import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../Styles/Theme';

const OutlinedButton = ({ type, className, children, onClick }) => {
  return (
    <Wrapper className={className}>
      <button type={type ?? 'button'} onClick={onClick}>
        {children}
      </button>
    </Wrapper>
  );
};

export default OutlinedButton;

const Wrapper = styled.div`
  background-color: white;
  border: 0.1rem solid ${theme.colors.green50};
  border-radius: 0.6rem;
  display: flex;
  flex-shrink: 0;

  &:hover {
    border-color: ${theme.colors.green70};
  }

  button {
    padding: 1.2rem 1.5rem;
    color: ${theme.colors.green50};
    font-size: 1.8rem;
    font-weight: bold;
    &:hover {
      color: ${theme.colors.green70};
    }
  }
`;
