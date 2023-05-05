import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';
import heartEmpty from '../../../assets/icons/heart-empty.svg';
import heartFill from '../../../assets/icons/heart-fill.svg';
import { categoryMap } from '../../../infra/Category';
import { useNavigate } from 'react-router-dom';

const SquareCard = ({
  boardId,
  thumbnail,
  menu,
  title,
  date,
  category,
  like,
}) => {
  const [show, setShow] = useState(false);
  const [isLike, setIsLike] = useState(like);
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`/board/${boardId}`);
  };

  const iconHandler = () => {
    if (isLike) {
      setIsLike(!isLike);
      // setTotal((total) => total - 1);
    } else {
      setIsLike(!isLike);
      // setTotal((total) => total + 1);
    }
  };

  const dateFormat =
    date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();

  return (
    <Wrapper
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      onClick={navigateHandler}
    >
      <img src={thumbnail} alt='thumbnail' className='thumbnail' />
      {show && (
        <div className='backcover'>
          <div className='category'>
            [{categoryMap[category]}] {menu}
          </div>
          <div className='title'>{title}</div>
          <div className='bottomsection'>
            {!isLike ? (
              <Like src={heartEmpty} alt='heartEmpty' onClick={iconHandler} />
            ) : (
              <Like src={heartFill} alt='heartFill' onClick={iconHandler} />
            )}
            <div className='category date'>{dateFormat}</div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default SquareCard;

const Wrapper = styled.div`
  display: flex;
  width: 30%;
  height: 30rem;
  cursor: pointer;
  margin: 1.3rem;
  position: relative;
  justify-content: center;
  .thumbnail {
    position: absolute;
    width: 30rem;
    height: 30rem;
    z-index: -1;
  }
  &:hover {
  }
  .backcover {
    background-color: rgba(0, 0, 0, 0.4);
    color: ${theme.colors.grey10};
    width: 30rem;
    height: 30rem;
    padding: 2.9rem;
    font-size: 1.7rem;
    .category {
      margin-bottom: 3.5rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .title {
      font-size: 1.9rem;
      line-height: 3rem;
      overflow: hidden;
      word-break: break-word;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      height: 15rem;
      margin-bottom: 2rem;
    }
    .date {
      display: flex;
      flex-direction: row-reverse;
    }
    .bottomsection {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const Like = styled.img`
  width: 3rem;
  height: 3rem;
  /* object-fit: cover; */
  cursor: pointer;
  margin-bottom: 3.5rem;
`;
