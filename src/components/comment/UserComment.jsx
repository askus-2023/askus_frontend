import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextButton from '../common/button/TextButton';
import defaultProfile from '../../assets/images/default-profile.png';
import { theme } from '../../styles/Theme';
import WriteComment from './WriteComment';

const UserComment = ({ comments }) => {
  const [isOpenReply, openReply] = useState([]);

  const handleOpenReply = (idx) => {
    const prev = [...isOpenReply];
    prev.splice(idx, 1, true);
    openReply(prev);
  };

  const handleCloseReply = (idx) => {
    const prev = [...isOpenReply];
    prev.splice(idx, 1, false);
    openReply(prev);
  };

  useEffect(() => {
    if (comments.length) {
      const list = [];
      for (const _ of comments) {
        list.push(false);
      }
      openReply(list);
    }
  }, []);

  console.log(isOpenReply);

  return (
    <Wrapper>
      {comments.map((value, idx) => (
        <div className={`comments-${idx + 1}`} key={idx}>
          <Commenter>
            <img src={defaultProfile} alt='프로필 이미지' />
            <div>
              <div className='commenter-nickname'>{value.replyAuthor}</div>
              <div className='comment-created-at'>{value.createdAt}</div>
            </div>
          </Commenter>
          <Comment>
            <p>{value.content}</p>
          </Comment>
          <Reply>
            <TextButton
              onClick={() => handleOpenReply(idx)}
              className='button button-reply'
            >
              답글 쓰기
            </TextButton>
            {isOpenReply[idx] && (
              <WriteReply>
                <div className='bar' />
                <WriteComment
                  type='reply'
                  onClickCancelReply={() => handleCloseReply(idx)}
                />
              </WriteReply>
            )}
          </Reply>
        </div>
      ))}
    </Wrapper>
  );
};

export default UserComment;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  .comments {
  }
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
