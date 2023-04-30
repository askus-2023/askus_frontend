import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/Theme';
import defaultProfile from '../../../assets/images/default-profile.png';
import defaultThumbnail from '../../../assets/images/thumbnail.png';
import heartEmpty from '../../../assets/icons/heart-empty.svg';
import heartFill from '../../../assets/icons/heart-fill.svg';
import { categoryMap } from '../../../infra/category';
import useDatetimeFormat from '../../../hooks/useDatetimeFormat';

const Card = ({
  thumbnail,
  foodName,
  title,
  date,
  nickname,
  profile,
  category,
  myLike,
  likeTotal,
  onClickTitle,
}) => {
  const { displayDatetime } = useDatetimeFormat();

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={thumbnail ?? defaultThumbnail} alt='thumbnail' />
      </ImageWrapper>
      <InfoWrapper>
        <Info>
          <Menu>
            [{categoryMap[category]}] {foodName}
          </Menu>
          <Title onClick={onClickTitle}>{title}</Title>
          <Datetime>{displayDatetime(new Date(date) - new Date())}</Datetime>
        </Info>
        <Writer>
          <WriterInfo>
            <UserImage src={profile ?? defaultProfile} alt='profile' />
            <Nickname>{nickname}</Nickname>
          </WriterInfo>
          <div>
            {!myLike ? (
              <Like src={heartEmpty} alt='heartEmpty' onClick={() => {}} />
            ) : (
              <Like src={heartFill} alt='heartFill' onClick={() => {}} />
            )}
            <Total>{likeTotal}</Total>
          </div>
        </Writer>
      </InfoWrapper>
    </Wrapper>
  );
};

const card = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 24rem;
  height: 30rem;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  border: 0.1rem solid ${theme.colors.grey30};
  border-radius: 0.6rem;
  transition: ${card} 5s;
  animation: ${card} 2s;
`;

const ImageWrapper = styled.div`
  width: 24rem;
  height: 17rem;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  &:hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
    margin: 0px auto;
    overflow: hidden;
  }
`;

const InfoWrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const Info = styled.div`
  text-align: left;
  width: 100%;
`;

const Menu = styled.h4`
  color: ${theme.colors.grey50};
  font-size: 1.2rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5rem;
  margin-bottom: 0.3rem;
  white-space: nowrap;
`;

const Title = styled.h3`
  color: ${theme.colors.grey90};
  font-size: 1.6rem;
  font-weight: bolder;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  margin-bottom: 0.3rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Datetime = styled.p`
  color: ${theme.colors.grey50};
  font-size: 1.1rem;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Writer = styled.div`
  display: flex;
  text-align: left;
  margin-top: 1.2rem;
  width: 100%;
  div {
    display: flex;
    align-items: center;
  }
`;

const WriterInfo = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
`;

const UserImage = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 1.5rem;
`;

const Nickname = styled.h4`
  color: ${theme.colors.grey70};
  font-size: 1.2rem;
  font-weight: unset;
  line-height: 1.5rem;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const Total = styled.div`
  font-size: 1.3rem;
  color: ${theme.colors.grey50};
`;

const Like = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  object-fit: cover;
  cursor: pointer;
`;

export default Card;
