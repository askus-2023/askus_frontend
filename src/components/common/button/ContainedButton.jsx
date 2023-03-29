import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';

const ContainedButton = ({ type, className, children, onClick }) => {
  return (
    <Wrapper className={className}>
      <button type={type ?? 'button'} onClick={onClick}>
        <span>{children}</span>
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
    width: 100%;
    padding: 1.2rem 1.5rem;
    color: white;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;
