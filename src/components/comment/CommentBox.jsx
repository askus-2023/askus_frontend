import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import icArrow from '../../assets/icons/arrow-up.svg';
import UserComment from './UserComment';
import WriteComment from './WriteComment';
import Spinner from '../common/spinner/Spinner';
import { getComments } from '../../apis/comment';

const CommentBox = ({ boardId }) => {
  const [isOpenComment, openComment] = useState(true);
  const { data, isLoading, isSuccess } = useQuery(
    [`boards/${boardId}/replies`],
    () => getComments({ boardId })
  );

  return (
    <Wrapper>
      <Header
        className='header'
        isOpen={isOpenComment}
        onClick={() => openComment(!isOpenComment)}
      >
        <p>댓글 ({data?.length})</p>
        <img src={icArrow} alt='아이콘' />
      </Header>
      {isOpenComment && (
        <Body className='body'>
          <div className='body__write-comment'>
            <WriteComment type='comment' boardId={boardId} />
          </div>
          {isLoading && (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          )}
          {isSuccess && (
            <div className='body__user-comments'>
              {data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((value) => (
                  <div key={value.createdAt}>
                    <UserComment
                      content={value.content}
                      replyAuthor={value.replyAuthor}
                      createdAt={value.createdAt}
                      boardId={boardId}
                      myReply={value.myReply}
                      commentId={value.replyId}
                      authorProfileImageUrl={value.authorProfileImageUrl}
                    />
                  </div>
                ))}
            </div>
          )}
        </Body>
      )}
    </Wrapper>
  );
};

export default CommentBox;

const Wrapper = styled.div`
  min-width: 28rem;
  max-width: 45rem;
  flex-shrink: 0;
  font-size: 1.2rem;
  border: 0.1rem solid ${theme.colors.grey30};
  border-radius: 0.8rem;
`;
const Header = styled.div`
  display: flex;
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: bold;
  justify-content: space-between;
  cursor: pointer;
  img {
    transform: ${({ isOpen }) => (isOpen ? '' : 'rotate(180deg)')};
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  .body__write-comment {
    padding: 0 1.2rem;
  }
  .body__user-comments {
    max-height: 50rem;
    overflow: auto;
    ${theme.options.scrollBar};
  }
`;
const SpinnerWrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
