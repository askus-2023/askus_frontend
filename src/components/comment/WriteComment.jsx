import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import ContainedButton from '../common/button/ContainedButton';
import TextButton from '../common/button/TextButton';

const WriteComment = ({ type, onClickCancelReply }) => {
  const [comment, setComment] = useState('');
  const [isOpen, open] = useState(true);
  return (
    <Wrapper onClick={() => open(true)}>
      <FormEl isOpen={isOpen}>
        {!comment && <Placeholder>댓글을 작성해보세요</Placeholder>}
        {isOpen && (
          <>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <ButtonWrapper>
              <TextButton
                onClick={(e) => {
                  if (type === 'reply') {
                    onClickCancelReply(() => false);
                  } else {
                    e.stopPropagation();
                    open(false);
                  }
                }}
                className='comment-button comment-button-text'
              >
                취소
              </TextButton>
              <ContainedButton className='comment-button comment-button-contained'>
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
  position: relative;
  min-height: 3.6rem;
  flex: 1 1 auto;
  border-radius: 0.6rem;
  box-shadow: 0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.2);
  padding: 1.2rem;
`;
const FormEl = styled.form`
  textarea {
    width: 100%;
    padding: 0;
    border: none;
    background: transparent;
    resize: none;
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
  user-select: none;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  .comment-button {
    button {
      padding: 0.6rem 1rem;
      font-size: 1.2rem;
    }
  }
  .comment-button-text {
    button {
      color: ${theme.colors.grey70};
    }
  }
`;
