import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import ContainedButton from '../common/button/ContainedButton';
import TextButton from '../common/button/TextButton';
import { createComment, editComment } from '../../apis/comment';

const WriteComment = ({
  boardId,
  editMode,
  commentId,
  existingComment,
  setEditMode,
}) => {
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState(existingComment ?? '');
  const [isOpen, open] = useState(true);
  const queryClient = useQueryClient();
  const createMutation = useMutation(createComment);
  const editMutation = useMutation(editComment);

  const commentHandler = (e) => {
    e.preventDefault();
    if (!editMode) {
      if (comment) {
        createMutation.mutate(
          {
            boardId,
            content: comment,
          },
          {
            onSuccess: () => {
              setComment('');
              queryClient.invalidateQueries([`boards/${boardId}/replies`]);
            },
          }
        );
      }
    } else {
      if (newComment) {
        editMutation.mutate(
          {
            boardId,
            commentId,
            content: newComment,
          },
          {
            onSuccess: () => {
              setComment('');
              setEditMode(() => false);
              queryClient.invalidateQueries([`boards/${boardId}/replies`]);
            },
          }
        );
      }
    }
  };
  return (
    <Wrapper onClick={() => open(true)}>
      <FormEl isOpen={isOpen} onSubmit={commentHandler}>
        {!comment && !editMode && (
          <Placeholder>댓글을 작성해보세요</Placeholder>
        )}
        {isOpen && (
          <>
            <textarea
              value={!editMode ? comment : newComment}
              onChange={(e) =>
                !editMode
                  ? setComment(e.target.value)
                  : setNewComment(e.target.value)
              }
            />
            <ButtonWrapper>
              <TextButton
                open={open}
                onClick={(e) => {
                  if (editMode) {
                    setEditMode(() => false);
                  } else {
                    e.stopPropagation();
                    open(false);
                  }
                }}
                className='comment-button comment-button-text'
              >
                취소
              </TextButton>
              <ContainedButton
                type='submit'
                className='comment-button comment-button-contained'
              >
                작성하기
              </ContainedButton>
            </ButtonWrapper>
          </>
        )}
      </FormEl>
    </Wrapper>
  );
};

export default WriteComment;

const Wrapper = styled.div`
  min-height: 4rem;
  position: relative;
  flex: 1 1 auto;
  border-radius: 0.6rem;
  box-shadow: 0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.2);
  padding: 1.2rem;
`;
const FormEl = styled.form`
  height: ${({ isOpen }) => (isOpen ? '10rem' : '')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  textarea {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background: transparent;
    resize: none;
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: ${theme.colors.grey50};
    }
  }
`;
const Placeholder = styled.span`
  position: absolute;
  z-index: -1;
  color: ${theme.colors.grey50};
  font-size: 1.3rem;
  user-select: none;
`;
const ButtonWrapper = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  .comment-button {
    button {
      padding: 0.6rem 1rem;
      font-size: 1.3rem;
    }
  }
  .comment-button-text {
    button {
      color: ${theme.colors.grey70};
    }
  }
`;
