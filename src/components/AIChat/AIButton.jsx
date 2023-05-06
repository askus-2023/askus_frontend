import React from 'react';
import styled from 'styled-components';
import icChatbot from '../../assets/icons/chatbot.svg';
import { useRecoilState } from 'recoil';
import { chatWindowState } from '../../recoil/AIChat/chatWindow';

const AIButton = () => {
  const [isOpenChat, openChat] = useRecoilState(chatWindowState);

  const displayChatHandler = () => {
    openChat((prev) => {
      return {
        ...prev,
        button: false,
      };
    });
    setTimeout(
      () =>
        openChat((prev) => {
          return {
            ...prev,
            chatWindow: true,
          };
        }),
      300
    );
  };

  return (
    <Wrapper isOpenChat={isOpenChat.button} onClick={displayChatHandler}>
      <img src={icChatbot} alt='챗봇' className='ic-chatbot' />
    </Wrapper>
  );
};

export default AIButton;

const Wrapper = styled.div`
  background: white;
  position: fixed;
  z-index: 12;
  bottom: 4rem;
  right: 4rem;
  padding: 1rem;
  border-radius: 44%;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  &:hover {
    cursor: pointer;
  }
  .ic-chatbot {
    width: 4.2rem;
    height: 4rem;
  }
  transition: opacity 0.2s;
  opacity: ${({ isOpenChat }) => (isOpenChat ? '1' : '0')};
`;
