import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/Theme';
import defaultProfile from '../../../assets/images/default-profile.png';
import defaultThumbnail from '../../../assets/images/thumbnail.png';
import heartEmpty from '../../../assets/icons/heart-empty.svg';
import heartFill from '../../../assets/icons/heart-fill.svg';
import icChat from '../../../assets/icons/chat.svg';
import { categoryMap } from '../../../infra/Category';
import useDatetimeFormat from '../../../hooks/useDatetimeFormat';
import { addLike, removeLike } from '../../../apis/like';

const Card = ({
  boardId,
  thumbnail,
  foodName,
  title,
  date,
  nickname,
  profile,
  category,
  myLike,
  likeCount,
  replyCount,
  accessToken,
}) => {
  const { displayDatetime } = useDatetimeFormat();
  const [likes, setLikes] = useState(likeCount);
  const [liked, setLiked] = useState(myLike);
  const navigate = useNavigate();
  const addLikeMutation = useMutation(addLike);
  const removeLikeMutation = useMutation(removeLike);

  const addLikeHandler = () => {
    if (!liked) {
      addLikeMutation.mutate(
        {
          boardId,
          accessToken,
        },
        {
          onSuccess: (res) => {
            setLikes(res.data.likeCount);
            setLiked(true);
          },
        }
      );
    }
  };

  const removeLikeHandler = () => {
    if (liked) {
      removeLikeMutation.mutate(
        {
          boardId,
          accessToken,
        },
        {
          onSuccess: () => {
            setLikes((prev) => prev - 1);
            setLiked(false);
          },
        }
      );
    }
  };

  const navigateHandler = () => {
    navigate(`${boardId}`, {
      state: { authorProfile: profile, likes, liked },
    });
  };
  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src={thumbnail ?? defaultThumbnail}
          alt='thumbnail'
          onClick={navigateHandler}
        />
      </ImageWrapper>
      <InfoWrapper>
        <Info>
          <Menu>
            [{categoryMap[category]}] {foodName}
          </Menu>
          <Title title={title} onClick={navigateHandler}>{title}</Title>
          <Datetime>{displayDatetime(new Date(date) - new Date())}</Datetime>
        </Info>
        <Writer>
          <WriterInfo>
            <UserImage src={profile ?? defaultProfile} alt='profile' />
            <Nickname>{nickname}</Nickname>
          </WriterInfo>
          <ChatandLikes>
            <img src={icChat} alt='chat' />
            <div className=' total reply-total'>{replyCount}</div>
            {!liked ? (
              <Like
                src={heartEmpty}
                alt='heartEmpty'
                onClick={addLikeHandler}
              />
            ) : (
              <Like
                src={heartFill}
                alt='heartFill'
                onClick={removeLikeHandler}
              />
            )}
            <div className='total like-total'>{likes}</div>
          </ChatandLikes>
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
  -webkit-line-clamp: 1;
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
const ChatandLikes = styled.div`
  img {
    width: 2.4rem;
    height: 2.4rem;
    object-fit: cover;
  }
  .total {
    margin-left: 0.2rem;
    font-size: 1.4rem;
    color: ${theme.colors.grey70};
  }
  .reply-total {
    margin-right: 0.8rem;
  }
`;

const Like = styled.img`
  cursor: pointer;
`;

export default Card;
