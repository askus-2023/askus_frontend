import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import Card from '../../components/common/card/Card';
import ContainedButton from '../../components/common/button/ContainedButton';
import SelectButton from '../../components/common/button/SelectButton';
import Pagination from '../../components/common/pagination/Pagination';
import exPost from './DummyPost';
import useScroll from '../../hooks/useScroll';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';
import { authModalState } from '../../recoil/auth/authModal';
import { useQuery } from 'react-query';
import { getList } from '../../apis/board';

const category = ['전체', '한식', '양식', '일식', '중식', '기타'];

const filterOption = [
  {
    text: '최신순',
    value: 'NEWEST',
  },
  {
    text: '좋아요순',
    value: 'LIKES',
  },
];

const limit = 20;

const Board = () => {
  const [selectedCate, setSelectedCate] = useState('전체');
  const [selectedfilter, setSelectedFilter] = useState('최신순');
  const [isSelected, setIsSelected] = useState(false);
  const [page, setPage] = useState(1);
  const accessToken = useRecoilValue(accessTokenState);
  const [, openModal] = useRecoilState(authModalState);
  const ref = useRef(null);

  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, error, isError } = useQuery(['/boards'], () => 
    getList({
      "tag": "",
      "dateLoe": "", 
      "dateGoe":"",
      "sortTarget": "CREATED_AT_DESC"
    }), {
      onError: (res) => console.log(res)
    })

  const categoryHandler = (e) => {
    setSelectedCate(e.target.textContent);
    setIsSelected(true);
    setPage(1);
    setSelectedFilter('최신순');
  };

  const filterHandler = (e) => {
    setSelectedFilter(e.target.value);
    setIsSelected(true);
    setPage(1);
  };

  useScroll(ref);

  const expost =
    selectedCate === '전체'
      ? exPost
      : exPost.filter((post) => post.category === selectedCate);

  return (
    <Wrapper ref={ref}>
      <TopSection>
        <CategorySection>
          {category.map((cate, i) => (
            <Category
              key={i}
              className={selectedCate === cate && 'cateSelect'}
              value={cate}
              onClick={categoryHandler}
            >
              {cate}
            </Category>
          ))}
        </CategorySection>
        <ContainedButton
          onClick={() => {
            if (!accessToken) {
              openModal(true);
            } else {
              navigate('write');
            }
          }}
          className='postButton'
        >
          글 작성
        </ContainedButton>
      </TopSection>
      <SelectSection>
        <SelectButton
          onChange={filterHandler}
          option={filterOption}
          selected={selectedfilter}
        />
      </SelectSection>
      <CardSection>
        {isSuccess && data
          .slice(offset, offset + limit)
          .map((post) => (
            <Card
              key={post.id}
              thumbnail={post.thumbnailImageUrl}
              menu={post.menu}
              title={post.title}
              date={post.createdAt}
              nickname={post.author}
              profile={post.profile}
              category={post.category ?? ''}
              liketotal={post.likeCount}
              onClick={navigate(post.id)}
            ></Card>
          ))}
      </CardSection>
      <footer>
        <Pagination
          total={expost.length}
          limit={limit}
          page={page}
          setPage={setPage}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
      </footer>
    </Wrapper>
  );
};

export default Board;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 3.6rem 0 5.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  margin: auto;
  overflow-y: auto;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 20rem;
  .postButton {
    height: fit-content;
    button {
      padding: 0.8rem 1.4rem;
    }
  }
`;

const CategorySection = styled.div`
  display: flex;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
  .defaultCategory {
    color: ${theme.colors.grey90};
    border-bottom: 0.2rem solid ${theme.colors.grey90};
  }
  .cateSelect {
    color: ${theme.colors.grey90};
    border-bottom: 0.2rem solid ${theme.colors.grey90};
  }
`;

const Category = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.grey30};
  margin-top: 16rem;
  margin-right: 2rem;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.grey90};
    border-bottom: 0.2rem solid ${theme.colors.grey90};
  }
`;

const SelectSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CardSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  gap: 40px;
`;
