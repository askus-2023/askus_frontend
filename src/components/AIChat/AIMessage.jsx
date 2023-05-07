import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';

const AIMessage = ({ message, children, isLoading }) => {
  return (
    <Wrapper>
      <Message>
        {isLoading ?
          children :
          <p className='ai-message'>{message}</p>  
        }
      </Message>
    </Wrapper>
  );
};

export default AIMessage;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.6rem;
`;
const Message = styled.div`
  max-width: 80%;
  padding: 0.6rem 1.2rem;
  border-radius: 0.8rem;
  background-color: ${theme.colors.grey30};
  .ai-message {
    word-wrap: break-word;
    white-space: pre-line;
    font-size: 1.4rem;
    line-height: 1.4;
  }
`;
