import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import ContainedButton from '../../components/common/button/ContainedButton';
import SelectButton from '../../components/common/button/SelectButton';
import Pagination from '../../components/common/pagination/Pagination';
import useScroll from '../../hooks/useScroll';
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
  const [selectedfilter, setSelectedFilter] = useState('최신순');
  const [postLength, setPostLength] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [page, setPage] = useState(1);
  const accessToken = useRecoilValue(accessTokenState);
  const [, openModal] = useRecoilState(authModalState);
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const categoryHandler = (key) => {
    setIsSelected(true);
    setPage(1);
    setSelectedFilter('최신순');

    if (key === 'ALL') {
      key = '';
    } else if (key === 'EUROPEAN') {
      key = 'WESTERN';
    }
    navigate(`${key.toLowerCase()}`);
  };

  const filterHandler = (e) => {
    setSelectedFilter(e.target.value);
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

  useScroll(ref);

  return (
    <Wrapper ref={ref}>
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
        <SelectSection>
          <SelectButton
            onChange={filterHandler}
            option={filterOption}
            selected={selectedfilter}
          />
        </SelectSection>
      </div>
      <Outlet context={{ page, setPostLength }} />
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
  padding: 16rem 3.6rem 0 5.2rem;
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
  justify-content: flex-end;
  margin-top: 1.6rem;
`;
