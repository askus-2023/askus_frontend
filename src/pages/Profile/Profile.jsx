import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import profile from '../../assets/images/default-profile.png';
import OutlinedButton from '../../components/common/button/OutlinedButton';
import Header from '../../components/header/Header';
import SquareCard from '../../components/common/card/SquareCard';
import exPost from '../Board/DummyPost';
import useScroll from '../../hooks/useScroll';

const Profile = () => {
  const [selectedCate, setSelectedCate] = useState('작성글');
  const ref = useRef(null);
  const navigate = useNavigate();

  const { scrollTop } = useScroll(ref);

  const postcategory = ['작성글', '좋아요'];

  const categoryHandler = (e) => {
    setSelectedCate(e.target.value);
  };

  return (
    <Container ref={ref} className='container'>
      <Header scrollTop={scrollTop} />
      <Wrapper>
        <TopSection>
          <Info>
            <img src={profile} alt='profile' />
            <div className='infotxt'>
              <Greettxt>
                <span>아무개</span> 님, 반가워요!
              </Greettxt>
              <div>abc@email.com</div>
            </div>
          </Info>
          <div>
            <OutlinedButton onClick={() => navigate('edit')}>
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
                {cate}(2)
              </button>
            ))}
          </PostCategory>
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
              : exPost.map((post) => (
                  <SquareCard
                    key={post.id}
                    thumbnail={post.thumbnail}
                    menu={post.menu}
                    title={post.title}
                    category={post.category}
                    date={new Date(post.date)}
                    like={post.like}
                  />
                ))}
          </PostCard>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  width: 89.6%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4rem;
  margin: 13rem auto auto;
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
  border-bottom: 0.1rem solid gray;
  margin: auto 19rem;
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
  margin: 2rem 19rem;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;
