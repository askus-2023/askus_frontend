import React, { useRef } from 'react';
import styled from 'styled-components';
import thumbnail from '../../../assets/images/thumbnail.png';
import Header from '../../../components/header/Header';
import CommentBox from '../../../components/comment/CommentBox';
import Tag from '../../../components/tag/Tag';
import defaultProfile from '../../../assets/images/default-profile.png';
// import useScroll from '../../../hooks/useScroll';

const BoardDetailPage = () => {
  const ref = useRef(null);
  // const { scrollTop } = useScroll(ref);

  return (
    <Wrapper ref={ref}>
      {/* <Header scrollTop={scrollTop} /> */}
      <Thumbnail className='thumbnail thumbnail-container'>
        <div className='thumbnail__info thumbnail__info-left'>
          <Name>[중식] 연어포케 샐러드</Name>
          <Title>맛있게 다이어트 할 수 있는! 다이어트 식단 추천</Title>
        </div>
        <div className='thumbnail__info thumbnail__info-right'>
          <CreatedAt>2023.4.25</CreatedAt>
        </div>
      </Thumbnail>
      <Content>
        <div className='content content-left'>
          <Keywords>
            <Tag type='outline' hash={true}>
              샐러드
            </Tag>
            <Tag type='outline' hash={true}>
              다이어트
            </Tag>
            <Tag type='outline' hash={true}>
              연어
            </Tag>
            <Tag type='outline' hash={true}>
              연어포케 샐러드
            </Tag>
          </Keywords>
          <MainContent></MainContent>
        </div>
        <div className='content content-right'>
          <AuthorInfo className='author-profile'>
            <div className='author-profile__image'>
              <img src={defaultProfile} alt='프로필 이미지' />
            </div>
            <div className='author-profile__nickname'>Cookle</div>
          </AuthorInfo>
          <CommentBox />
        </div>
      </Content>
    </Wrapper>
  );
};

export default BoardDetailPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const Thumbnail = styled.div`
  position: relative;
  padding: 4rem;
  height: 40rem;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${thumbnail}) no-repeat;
  background-size: cover;
  background-position: center center;
  .thumbnail__info {
    color: white;
    font-weight: bold;
  }
  .thumbnail__info-left {
    padding: 0 2rem 0 1.2rem;
    flex: 0 1 60%;
    gap: 1.6rem;
    font-size: 2.2rem;
    line-height: 2.8rem;
  }
  .thumbnail__info-right {
    padding: 0 1.2rem 0 2rem;
    flex: 0 1 40%;
    display: flex;
    font-size: 1.6rem;
    justify-content: flex-end;
  }
`;
const Name = styled.p`
  margin-bottom: 1.6rem;
`;
const Title = styled.p`
  font-size: 3.2rem;
  line-height: 4rem;
`;
const CreatedAt = styled.p``;
const Content = styled.div`
  height: 100rem;
  padding: 4rem;
  display: flex;
  .content-left {
    padding: 0 1.2rem;
    flex: 0 0 60%;
  }
  .content-right {
    padding: 0 1.2rem;
    flex: 0 1 40%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
`;
const Keywords = styled.div``;
const MainContent = styled.div``;
const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  img {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 50%;
  }
  .author-profile__nickname {
    font-size: 1.6rem;
  }
`;
