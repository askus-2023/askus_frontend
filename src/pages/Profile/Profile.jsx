import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import OutlinedButton from '../../components/common/button/OutlinedButton';
import SquareCard from '../../components/common/card/SquareCard';
import { viewProfile, viewProfileBoardLike } from '../../api/profile';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';

const Profile = () => {
  const [selectedCate, setSelectedCate] = useState('작성글');
  const [myPost, setMyPost] = useState();
  const [likePost, setLikePost] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = useRecoilValue(accessTokenState);

  const {
    data: viewData,
    isLoading: viewDataIsLoading,
    error: viewDataError,
  } = useQuery('viewProfile', () => {
    return viewProfile({
      accessToken: accessToken,
    });
  });
  const [profileData, setProfileData] = useState(viewData);
  const email = window.localStorage.getItem('email');

  const {
    data: likeData,
    isLoading: likeDataIsLoading,
    error: likeDataError,
  } = useQuery('viewProfileBoardLike', () => {
    return viewProfileBoardLike({ accessToken: accessToken, params: 'like' });
  });

  const [likeBoardData, setLikeBoardData] = useState(likeData);

  useEffect(() => {
    if (location.state?.cate) {
      setSelectedCate(location.state.cate);
      if (myPost || likePost) {
        window.scrollTo({ top: 200, behavior: 'smooth' });
      }
    }
  }, [likePost, location.state?.cate, myPost]);

  useEffect(() => {
    setProfileData(viewData);
    setLikeBoardData(likeData);
    if (viewData) {
      setMyPost(viewData.boards);
    }
    if (likeData) {
      setLikePost(likeData.boards);
    }
  }, [myPost, likeData, likeBoardData, viewData]);

  if (viewDataIsLoading || likeDataIsLoading) {
    return <div>Loading...</div>;
  }

  if (viewDataError || likeDataError) {
    return <div>An error has occurred: {viewDataError.message}</div>;
  }

  const postcategory = ['작성글', '좋아요'];

  const categoryHandler = (e) => {
    setSelectedCate(e.target.value);
  };

  return (
    <Wrapper>
      <TopSection>
        <Info>
          <img src={viewData.profileImageUrl} alt='profile' />
          <div className='infotxt'>
            <Greettxt>
              <span>{viewData.nickname}</span> 님, 반가워요!
            </Greettxt>
            <div>{email}</div>
          </div>
        </Info>
        <div>
          <OutlinedButton
            onClick={() =>
              navigate('edit', {
                state: profileData,
              })
            }
          >
            내 정보 수정
          </OutlinedButton>
        </div>
      </TopSection>
      <div>
        <PostCategory>
          {postcategory.map((cate, i) => (
            <button
              key={i}
              className={selectedCate === cate ? 'cateSelect' : ''}
              value={cate}
              onClick={categoryHandler}
            >
              {cate}(
              {cate === '작성글'
                ? myPost && myPost.length
                : likePost && likePost.length}
              )
            </button>
          ))}
        </PostCategory>
        <div>
          <PostCard>
            {selectedCate === '좋아요'
              ? likePost &&
                likePost
                  .map((post) => (
                    <SquareCard
                      key={post.id}
                      boardId={post.id}
                      thumbnail={post.thumbnailImageUrl}
                      menu={post.foodsName}
                      title={post.title}
                      category={post.category}
                      date={new Date(post.createdAt)}
                      like={post.myLike}
                    />
                  ))
                  .filter((post) => post.props.like === true)
              : myPost &&
                myPost.map((post) => (
                  <SquareCard
                    key={post.id}
                    boardId={post.id}
                    thumbnail={post.thumbnailImageUrl}
                    menu={post.foodsName}
                    title={post.title}
                    category={post.category}
                    date={new Date(post.createdAt)}
                    like={post.myLike}
                  />
                ))}
          </PostCard>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4rem;
  padding: 13rem 0;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-around;
  height: fit-content;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 12rem;
    height: 12rem;
    object-fit: cover;
    border-radius: 6rem;
  }
  .infotxt {
    margin-left: 2rem;
    line-height: 3rem;
    font-size: 1.5rem;
    color: ${theme.colors.grey70};
  }
`;

const Greettxt = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.grey90};
  span {
    font-weight: bold;
  }
`;

const PostCategory = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 0.1rem solid ${theme.colors.grey40};
  margin: auto 23rem;
  cursor: pointer;
  button {
    width: 10rem;
    font-size: 2rem;
    line-height: 5rem;
    &:hover {
      font-weight: 600;
    }
  }
  .cateSelect {
    font-weight: 600;
  }
`;

const PostCard = styled.div`
  display: flex;
  margin: 2rem 23rem;
  justify-content: space-between;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;
