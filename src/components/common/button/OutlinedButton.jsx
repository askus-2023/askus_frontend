import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';

const OutlinedButton = ({ type, children, onClick }) => {
  return (
    <Wrapper>
      <button type={type ?? 'button'} onClick={onClick}>
        {children}
      </button>
    </Wrapper>
  );
};

export default OutlinedButton;

const Wrapper = styled.div`
  background-color: white;
  border: 1px solid ${theme.colors.green50};
  border-radius: 6px;
  display: flex;
  flex-shrink: 0;
  
  &:hover {
    border-color: ${theme.colors.green70};
  }

  button {
    padding: 12px 15px;
    color: ${theme.colors.green50};
    font-size: 16px;
    font-weight: bold;
    &:hover {
      color: ${theme.colors.green70};
    }
  }
`;
