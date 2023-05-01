import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import profile from '../../assets/images/default-profile.png';
import OutlinedButton from '../../components/common/button/OutlinedButton';
import SquareCard from '../../components/common/card/SquareCard';
import exPost from '../Board/DummyPost';
import useScroll from '../../hooks/useScroll';
import { viewProfile } from '../../apis/profile';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';

const Profile = () => {
  const [selectedCate, setSelectedCate] = useState('작성글');
  const [myPost, setMyPost] = useState();

  const ref = useRef(null);
  const navigate = useNavigate();
  const accessToken = useRecoilValue(accessTokenState);

  useScroll(ref);

  const { data, isLoading, error } = useQuery('profile', () => {
    return viewProfile({
      accessToken: accessToken,
    });
  });

  const profileData = data;

  useEffect(() => {
    if (data) {
      setMyPost(data.boards);
    }
    console.log(myPost);
  }, [data, myPost]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  const postcategory = ['작성글', '좋아요'];

  const categoryHandler = (e) => {
    setSelectedCate(e.target.value);
  };

  return (
    <Wrapper ref={ref}>
      <TopSection>
        <Info>
          <img src={data.profileImageUrl} alt='profile' />
          <div className='infotxt'>
            <Greettxt>
              <span>{data.nickname}</span> 님, 반가워요!
            </Greettxt>
            <div>abc@email.com</div>
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
              {cate}({myPost && myPost.length})
            </button>
          ))}
        </PostCategory>
        <div>
          <PostCard>
            {selectedCate === '좋아요'
              ? exPost
                  .map((post) => (
                    <SquareCard
                      key={post.id}
                      thumbnail={post.thumbnail}
                      menu={post.menu}
                      title={post.title}
                      category={post.category}
                      date={new Date(post.date)}
                      like={post.like}
                    />
                  ))
                  .filter((post) => post.props.like === true)
              : myPost &&
                myPost.map((post) => (
                  <SquareCard
                    key={post.boardId}
                    thumbnail={post.thumbnailImageUrl}
                    menu={post.foodName}
                    title={post.title}
                    category={post.category}
                    date={new Date(post.createdAt)}
                    like={post.like}
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4rem;
  padding: 13rem 0;
  overflow-y: auto;
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
