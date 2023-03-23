import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/card/Card';
import thumbnail from '../../assets/images/thumbnail.png';
import userimage from '../../assets/images/default-profile.png';
import { theme } from '../../styles/Theme';
import ContainedButton from '../../components/common/button/ContainedButton';
import TextButton from '../../components/common/button/TextButton';
import OutlinedButton from '../../components/common/button/OutlinedButton';
import SelectButton from '../../components/common/button/SelectButton';

const exPost = [
  {
    id: 1,
    thumbnail: thumbnail,
    menu: '연어포케 샐러드',
    title: '맛있게 다이어트 할 수 있는! 다이어트 식단 추천',
    date: '2023.03.23',
    nickname: 'Cookle',
    userimage: userimage,
    like: false,
  },
  {
    id: 2,
    thumbnail: thumbnail,
    menu: '연어포케 샐러드',
    title: '맛있게 다이어트 할 수 있는! 다이어트 식단 추천',
    date: '2023.03.23',
    nickname: 'Cookle',
    userimage: userimage,
    like: false,
  },
  {
    id: 3,
    thumbnail: thumbnail,
    menu: '연어포케 샐러드',
    title: '맛있게 다이어트 할 수 있는! 다이어트 식단 추천',
    date: '2023.03.23',
    nickname: 'Cookle',
    userimage: userimage,
    like: false,
  },
  {
    id: 4,
    thumbnail: thumbnail,
    menu: '연어포케 샐러드',
    title: '맛있게 다이어트 할 수 있는! 다이어트 식단 추천',
    date: '2023.03.23',
    nickname: 'Cookle',
    userimage: userimage,
    like: true,
  },
  {
    id: 5,
    thumbnail: thumbnail,
    menu: '연어포케 샐러드',
    title: '맛있게 다이어트 할 수 있는! 다이어트 식단 추천',
    date: '2023.03.23',
    nickname: 'Cookle',
    userimage: userimage,
    like: false,
  },
];

const Board = () => {
  const [selected, setSelected] = useState('');

  const option = ['최신순', '좋아요순'];

  const filterHandler = (e) => {
    setSelected(e.target.value);
  };

  return (
    <Wrapper>
      <TopSection>
        <CategorySection>
          <Category className='defaultCategory'>전체</Category>
          <Category>한식</Category>
          <Category>양식</Category>
          <Category>일식</Category>
          <Category>중식</Category>
          <Category>기타</Category>
        </CategorySection>
        <ContainedButton className='postButton'>글 작성</ContainedButton>
      </TopSection>
      <SelectSection>
        <SelectButton
          onChange={filterHandler}
          option={option}
          selected={selected}
        />
      </SelectSection>
      <CardSection>
        {exPost.map((post) => (
          <Card
            key={post.id}
            thumbnail={post.thumbnail}
            menu={post.menu}
            title={post.title}
            date={post.date}
            nickname={post.nickname}
            userimage={post.userimage}
            like={post.like}
          />
        ))}
      </CardSection>
    </Wrapper>
  );
};

export default Board;

const Wrapper = styled.div`
  width: 89.6%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  margin: auto;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 13rem;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
  .postButton {
    height: fit-content;
    margin: 7rem 2rem 0rem 0rem;
  }
`;

const CategorySection = styled.div`
  display: flex;
  .defaultCategory {
    color: ${theme.colors.grey90};
    border-bottom: 0.2rem solid ${theme.colors.grey90};
  }
`;

const Category = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.grey30};
  margin-top: 9rem;
  margin-right: 3rem;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.grey90};
    border-bottom: 0.2rem solid ${theme.colors.grey90};
  }
`;

const SelectSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
`;

const CardSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 40px;
`;
