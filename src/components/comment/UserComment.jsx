import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import TextButton from '../common/button/TextButton';
import defaultProfile from '../../assets/images/default-profile.png';
import { theme } from '../../styles/Theme';
// import WriteComment from './WriteComment';
import useDatetimeFormat from '../../hooks/useDatetimeFormat';

import { deleteComment } from '../../apis/comment';

const UserComment = ({
  commentId,
  boardId,
  content,
  replyAuthor,
  createdAt,
  accessToken,
}) => {
  const { displayDatetime } = useDatetimeFormat();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteComment);

  const deleteHandler = () => {
    deleteMutation.mutate(
      {
        boardId,
        commentId: 8,
        accessToken,
      },
      {
        onSuccess: () => queryClient.invalidateQueries([`boards/${boardId}`]),
      }
    );
  };

  return (
    <Wrapper>
      <Commenter>
        <img src={defaultProfile} alt='프로필 이미지' />
        <div>
          <div className='commenter-nickname'>{replyAuthor}</div>
          <div className='comment-created-at'>
            {displayDatetime(new Date(createdAt) - new Date())}
          </div>
        </div>
      </Commenter>
      <Comment>
        <p>{content}</p>
      </Comment>
      <Reply>
        <ButtonWrapper>
          <TextButton onClick={() => {}} className='button button-reply'>
            수정
          </TextButton>
          <TextButton onClick={deleteHandler} className='button button-reply'>
            삭제
          </TextButton>
        </ButtonWrapper>
        {/* {isOpenReply[idx] && (
          <WriteReply>
            <div className='bar' />
            <WriteComment
              type='reply'
              onClickCancelReply={() => handleCloseReply(idx)}
            />
          </WriteReply>
        )} */}
      </Reply>
    </Wrapper>
  );
};

export default UserComment;

const Wrapper = styled.div`
  padding: 1.2rem;
  margin-bottom: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
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
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;
// const WriteReply = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 1.8rem;
//   .bar {
//     width: 0.25rem;
//     margin-left: 1.6rem;
//     background-color: ${theme.colors.grey30};
//   }
// `;
