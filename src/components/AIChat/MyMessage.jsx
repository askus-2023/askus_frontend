import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';

const MyMessage = ({ message }) => {
  return (
    <Wrapper>
      <Message>
        <p className='my-message'>{message}</p>
      </Message>
    </Wrapper>
  );
};

export default MyMessage;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.6rem;
`;
const Message = styled.div`
  max-width: 80%;
  padding: 0.6rem 1.2rem;
  border-radius: 0.8rem;
  background-color: ${theme.colors.tomato};
  .my-message {
    word-wrap: break-word;
    white-space: pre-line;
    color: white;
    font-size: 1.4rem;
    line-height: 1.4;
  }
`;
