import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Card from '../common/card/Card';
import { getBoardList } from '../../apis/board';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';
import Spinner from '../common/spinner/Spinner';

const limit = 20;

const CardSection = ({ tag }) => {
  const { page, setPostLength } = useOutletContext()
  const offset = (page - 1) * limit;
  const accessToken = useRecoilValue(accessTokenState)
  const navigate = useNavigate();
  const { data, isSuccess, isLoading } = useQuery(
    [`/boards/${tag}`],
    () =>
      getBoardList({
        tag,
        dateLoe: '',
        dateGoe: '',
        sortTarget: 'CREATED_AT_DESC',
        accessToken,
      }),
    {
      staleTime: 30,
      onSuccess: (res) => {
        setPostLength(() => res.length);
        console.log(res);
      },
      onError: (res) => console.log(res),
    }
  );

  return (
    <Wrapper>
      {isLoading && 
        <>
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        </>
      }
      {isSuccess &&
        data
          .slice(offset, offset + limit)
          .map((post) => (
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
              accessToken={accessToken}
              onClickTitle={() =>
              navigate(`${post.id}`, {
                state: {
                  authorProfile: post.authorProfileImageUrl,
                  boardId: post.id,
                },
              })}
            />
          ))
      }
    </Wrapper>
  )
}

export default CardSection

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  gap: 40px;
`;
const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`