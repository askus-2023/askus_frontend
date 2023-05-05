import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import AIMessage from './AIMessage';
import MyMessage from './MyMessage';
import icChatbot from '../../assets/icons/chatbot-white.svg';
import icClose from '../../assets/icons/close-white.svg';
import openAI from '../../assets/images/openAI.png';
import { useRecoilState } from 'recoil';
import { messagesState } from '../../recoil/AIChat/messages';
import { chatWindowState } from '../../recoil/AIChat/chatWindow';
import { chatMount, chatUnmount } from '../../animation/Chat';

const ChatWindow = () => {
  const textAreaRef = useRef();
  const scrollRef = useRef();
  const [question, setQuestion] = useState('');
  const [animation, setAnimation] = useState('chat-mount');
  const [messages, setMessages] = useRecoilState(messagesState);
  const [, openChat] = useRecoilState(chatWindowState);

  const submitHandler = (e) => {
    e.preventDefault();
    if (question) {
      setMessages((prev) => [...prev, { from: 'me', content: question }]);
    }
    setQuestion('');
  };

  const handleCloseChat = () => {
    setAnimation('chat-unmount');
    setTimeout(
      () =>
        openChat((prev) => {
          return {
            ...prev,
            chatWindow: false,
          };
        }),
      200
    );
    setTimeout(
      () =>
        openChat((prev) => {
          return {
            ...prev,
            button: true,
          };
        }),
      400
    );
  };

  const scrollToBottom = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0rem';
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight / 10 + 'rem';
    }
  }, [textAreaRef, question]);

  useEffect(() => {
    scrollToBottom(scrollRef);
  }, [messages]);

  return (
    <Wrapper>
      <div className={`wrapper-chat ${animation}`}>
        <Header>
          <Avatar>
            <img src={icChatbot} alt='chatbot' className='avatar-img' />
            <span>레시피봇</span>
          </Avatar>
          <CloseButton onClick={handleCloseChat} src={icClose} alt='닫기' />
        </Header>
        <Body>
          <div className='messages-wrapper'>
            {messages.map((message, index) => {
              if (message.from === 'ai') {
                return <AIMessage key={index} message={message.content} />;
              } else {
                return <MyMessage key={index} message={message.content} />;
              }
            })}
            <div ref={scrollRef} />
          </div>
          <TypeArea>
            <form onSubmit={() => {}}>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                ref={textAreaRef}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      submitHandler(e);
                    }
                  }
                }}
              />
            </form>
          </TypeArea>
        </Body>
        <Footer>
          <p>
            <span>powered by </span>
            <img src={openAI} alt='open-ai' className='open-ai-logo' />
          </p>
        </Footer>
      </div>
    </Wrapper>
  );
};

export default ChatWindow;

const Wrapper = styled.div`
  .wrapper-chat {
    width: 30rem;
    position: fixed;
    bottom: 4rem;
    right: 4rem;
    z-index: 15;
    border-radius: 0.6rem;
    box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.3);
  }
  .chat-mount {
    animation: ${chatMount} 0.3s;
  }
  .chat-unmount {
    animation: ${chatUnmount} 0.3s;
  }
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 2rem;
  background: linear-gradient(105deg, ${theme.colors.tomato} 60%, orange);
  border-radius: 0.6rem 0.6rem 0 0;
`;
const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  span {
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
  }
  .avatar-img {
    width: 3rem;
    height: 3.675rem;
  }
`;
const CloseButton = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
const Body = styled.div`
  position: relative;
  height: 36rem;
  background-color: white;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
  .messages-wrapper {
    height: 100%;
    padding: 2rem 2rem 5.2rem 2rem;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const TypeArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.8rem 2rem;
  background-color: white;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0 -0.1rem 0.4rem rgba(0, 0, 0, 0.2);
  textarea {
    width: 100%;
    font-size: 1.4rem;
    max-height: 3.6rem;
    line-height: 1.2;
    resize: none;
    border: none;
    background: transparent;
    &:focus {
      outline: none;
    }
  }
`;
const Footer = styled.footer`
  background-color: white;
  border-radius: 0 0 0.6rem 0.6rem;
  padding: 1.2rem 2rem;
  p {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.2rem;
    gap: 0.6rem;
  }
`;
