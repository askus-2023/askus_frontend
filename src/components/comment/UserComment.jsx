import React, { useState } from 'react';
import styled from 'styled-components';
import TextButton from '../common/button/TextButton';
import defaultProfile from '../../assets/images/default-profile.png';
import { theme } from '../../styles/Theme';
import WriteComment from './WriteComment';
const UserComment = () => {
  const [isOpenReply, openReply] = useState(false);
  return (
    <Wrapper>
      <Commenter>
        <img src={defaultProfile} alt='프로필 이미지' />
        <div>
          <div className='commenter-nickname'>Cookle</div>
          <div className='comment-created-at'>3일 전</div>
        </div>
      </Commenter>
      <Comment>
        <p>코멘트입니다.</p>
      </Comment>
      <Reply>
        <TextButton
          onClick={() => openReply(true)}
          className='button button-reply'
        >
          답글 쓰기
        </TextButton>
        {isOpenReply && (
          <WriteReply>
            <div className='bar' />
            <WriteComment type='reply' onClickCancelReply={openReply} />
          </WriteReply>
        )}
      </Reply>
    </Wrapper>
  );
};

export default UserComment;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Commenter = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  img {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
  }
  .commenter-nickname {
    margin-bottom: 0.6rem;
  }
  .comment-created-at {
    color: ${theme.colors.grey70};
  }
`;
const Comment = styled.div`
  padding: 0.4rem 0;
`;
const Reply = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  .button-reply {
    justify-self: flex-end;
    margin-bottom: 1.6rem;
    button {
      color: ${theme.colors.grey70};
      font-size: 1.2rem;
      padding: 0;
      &:hover {
        background: transparent;
        text-decoration: underline;
      }
    }
  }
`;
const WriteReply = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.8rem;
  .bar {
    width: 0.25rem;
    margin-left: 1.6rem;
    background-color: ${theme.colors.grey30};
  }
`;
