import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';

// import profileImage from '../../../assets/images/profile.png';
import icHeartEmpty from '../../../assets/icons/ic-heart-empty.svg';
import icHeartFill from '../../../assets/icons/ic-heart-fill.svg';
// import { AiFillStar } from "react-icons/ai";

const Card = ({ thumbnail, menu, title, date, nickname, profile, like }) => {
  const [isMouseHover, setIsMouseHover] = useState(false);

  const iconHandler = () => {
    isMouseHover ? setIsMouseHover(false) : setIsMouseHover(true);
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={thumbnail} alt='thumbnail' />
      </ImageWrapper>
      <InfoWrapper>
        <Info>
          <Menu>{menu}</Menu>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </Info>
        <Writer>
          <WriterInfo>
            <UserImage src={profile} alt='profile' />
            <Nickname>{nickname}</Nickname>
          </WriterInfo>
          {!isMouseHover ? (
            <Like
              src={icHeartEmpty}
              alt='heartEmpty'
              onMouseOver={iconHandler}
            />
          ) : (
            <Like src={icHeartFill} alt='heartFill' onMouseOut={iconHandler} />
          )}
        </Writer>
      </InfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 24rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  border: 0.1rem solid ${theme.colors.grey30};
`;

const ImageWrapper = styled.div`
  width: 24rem;
  height: 17rem;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 17rem;
  object-fit: cover;
  overflow: hidden;
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
  font-size: 1rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5rem;
  margin-bottom: 0.3rem;
  white-space: nowrap;
`;

const Title = styled.h3`
  color: ${theme.colors.grey90};
  font-size: 1.5rem;
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

const Date = styled.p`
  color: ${theme.colors.grey50};
  font-size: 1.1rem;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Writer = styled.div`
  display: flex;
  text-align: left;
  width: 100%;
`;

const WriterInfo = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  width: 100%;
`;

const UserImage = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
`;

const Nickname = styled.h4`
  color: ${theme.colors.grey70};
  font-size: 1.2rem;
  font-weight: unset;
  line-height: 1.5rem;
  margin: 0 0 0.3rem 1rem;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const Like = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  cursor: pointer;
`;

export default Card;
