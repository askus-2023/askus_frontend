import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';

const ContainedButton = ({ type, children, onClick }) => {
  return (
    <Wrapper>
      <button type={type ?? 'button'} onClick={onClick}>
        {children}
      </button>
    </Wrapper>
  );
};

export default ContainedButton;

const Wrapper = styled.div`
  background-color: ${theme.colors.green50};
  border-radius: 0.6rem;
  display: flex;
  flex-shrink: 0;
  &:hover {
    background-color: ${theme.colors.green70};
  }

  button {
    padding: 1.2rem 1.5rem;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
  }
`;
