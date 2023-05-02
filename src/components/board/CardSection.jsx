import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Card from '../common/card/Card';
import { getBoardList } from '../../apis/board';
import Spinner from '../common/spinner/Spinner';

const limit = 20;
const filterMap = {
  NEWEST: 'CREATED_AT_DESC',
  LIKES: 'LIKE_COUNT_DESC',
};

const CardSection = ({ tag }) => {
  const { page, setPostLength, selected } = useOutletContext();
  const offset = (page - 1) * limit;
  const { data, isSuccess, isLoading, refetch } = useQuery(
    [`/boards/${tag}`],
    () =>
      getBoardList({
        tag,
        dateLoe: '',
        dateGoe: '',
        sortTarget: filterMap[selected],
      }),
    {
      staleTime: 30,
      onSuccess: (res) => setPostLength(() => res.length),
      onError: (res) => console.log(res),
    }
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <Wrapper>
      {isLoading && (
        <>
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        </>
      )}
      {isSuccess && (
        <div className='container'>
          <CardWrapper>
            {data.slice(offset, offset + limit).map((post) => (
              <Card
                key={post.id}
                boardId={post.id}
                profile={post.authorProfileImageUrl}
                thumbnail={post.thumbnailImageUrl}
                menu={post.menu}
                foodName={post.foodsName}
                title={post.title}
                date={post.createdAt}
                nickname={post.author}
                category={post.category ?? ''}
                likeCount={post.likeCount}
                myLike={post.myLike}
                replyCount={post.replyCount}
              />
            ))}
          </CardWrapper>
        </div>
      )}
    </Wrapper>
  );
};

export default CardSection;

const Wrapper = styled.div`
  margin: 6.8rem auto;
  .container {
    display: flex;
  }
`;
const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardWrapper = styled.div`
  min-height: 2.4rem;
  display: grid;
  flex: 1;
  grid-template-columns: repeat(auto-fill, 24rem);
  justify-content: center;
  gap: 4rem;
`;
