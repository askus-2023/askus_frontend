import React, { useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import ContainedButton from '../../components/common/button/ContainedButton';
import OutlinedButton from '../../components/common/button/OutlinedButton';
import SelectButton from '../../components/common/button/SelectButton';
import Pagination from '../../components/common/pagination/Pagination';
import icClose from '../../assets/icons/close.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';
import { authModalState } from '../../recoil/auth/authModal';
import { categoryMap } from '../../infra/Category';

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
  const [selectedCate, setSelectedCate] = useState('ALL');
  const [selectedFilter, setSelectedFilter] = useState('NEWEST');
  const [postLength, setPostLength] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [page, setPage] = useState(1);
  const accessToken = useRecoilValue(accessTokenState);
  const [, openModal] = useRecoilState(authModalState);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const categoryHandler = (key) => {
    setIsSelected(true);
    setPage(1);

    if (key === 'EUROPEAN') {
      key = 'WESTERN';
    }
    navigate(
      `${key.toLowerCase()}?keyword=${
        searchParams.get('keyword') ?? ''
      }&sort=${selectedFilter.toLowerCase()}`
    );
  };

  const filterHandler = (e) => {
    setSelectedFilter(e.target.value);
    setSearchParams({
      keyword: searchParams.get('keyword') ?? '',
      sort: e.target.value.toLowerCase(),
    });
    setIsSelected(true);
    setPage(1);
  };

  useEffect(() => {
    const category = location.pathname?.split('/').at(-1);

    switch (category) {
      case 'korean':
        setSelectedCate('KOREAN');
        break;
      case 'western':
        setSelectedCate('EUROPEAN');
        break;
      case 'japanese':
        setSelectedCate('JAPANESE');
        break;
      case 'chinese':
        setSelectedCate('CHINESE');
        break;
      case 'etc':
        setSelectedCate('ETC');
        break;
      default:
        setSelectedCate('ALL');
        break;
    }
  }, [location.pathname]);

  return (
    <Wrapper>
      <div className='top-section-wrapper'>
        <TopSection>
          <CategorySection>
            {Object.keys(categoryMap).map((key) => (
              <Category
                key={key}
                className={selectedCate === key && 'cateSelect'}
                onClick={() => categoryHandler(key)}
              >
                {categoryMap[key]}
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
        <SelectSection keyword={keyword}>
          {keyword && (
            <OutlinedButton className='search-result'>
              <span>검색어: {keyword}</span>
              <img
                role='presentation'
                onClick={() => {
                  setSearchParams({
                    keyword: '',
                    sort: selectedFilter.toLowerCase(),
                  });
                }}
                src={icClose}
                alt='검색어 삭제'
              />
            </OutlinedButton>
          )}
          <SelectButton
            onChange={filterHandler}
            option={filterOption}
            selected={selectedFilter}
          />
        </SelectSection>
      </div>
      <Outlet
        context={{
          page,
          setPostLength,
          selected: selectedFilter,
          keyword: location.state?.keyword,
        }}
      />
      <footer>
        <Pagination
          total={postLength}
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
  padding: 16rem 3.6rem 6rem 5.2rem;
  align-items: center;
  gap: 3rem;
  margin: auto;
  .top-section-wrapper {
    max-width: 136rem;
    margin: 0 auto;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin-right: 2rem;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.grey90};
    border-bottom: 0.2rem solid ${theme.colors.grey90};
  }
`;

const SelectSection = styled.div`
  display: flex;
  justify-content: ${({ keyword }) => (keyword ? 'space-between' : 'flex-end')};
  margin-top: 1.6rem;
  gap: 4rem;
  .search-result {
    border-color: ${theme.colors.grey50};
    &:hover {
      cursor: default;
    }
    button {
      color: ${theme.colors.grey90};
      padding: 0.4rem 1rem;
      span {
        font-size: 1.6rem;
        margin-right: 0.6rem;
      }
      img {
        width: 1.4rem;
        height: 1.4rem;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;
