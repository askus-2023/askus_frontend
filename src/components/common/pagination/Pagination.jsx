import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';
import icArrow from '../../../assets/icons/arrow-up-white.svg';

function Pagination({
  total,
  limit,
  page,
  setPage,
  isSelected,
  setIsSelected,
}) {
  const numPages = Math.ceil(total / limit);
  const [currPage, setCurrPage] = useState(page);

  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;

  useEffect(() => {
    if (isSelected) {
      setIsSelected(false);
      return setCurrPage(1);
    }
  }, [isSelected, setIsSelected]);

  return (
    <>
      <Nav>
        <Button
          className='arrow'
          onClick={() => {
            setPage(page - 1);
            setCurrPage(page - 2);
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
          }}
          disabled={page === 1}
        >
          <img className='arrow-left' src={icArrow} alt='to-next' />
        </Button>
        <Button
          pageChange
          onClick={() => {
            setPage(firstNum);
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
          }}
          aria-current={page === firstNum ? 'page' : null}
        >
          {firstNum}
        </Button>
        {Array(4)
          .fill()
          .map((_, i) => {
            if (i <= 2) {
              if (firstNum + i >= numPages) {
                return;
              }
              return (
                <Button
                  border='true'
                  key={i + 1}
                  onClick={() => {
                    setPage(firstNum + 1 + i);
                    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
                  }}
                  aria-current={page === firstNum + 1 + i ? 'page' : null}
                >
                  {firstNum + 1 + i}
                </Button>
              );
            } else if (i >= 3) {
              if (firstNum + i >= numPages) {
                return;
              }
              return (
                <Button
                  border='true'
                  key={i + 1}
                  onClick={() => {
                    setPage(lastNum);
                    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
                  }}
                  aria-current={page === lastNum ? 'page' : null}
                >
                  {lastNum}
                </Button>
              );
            }
          })}
        <Button
          className='arrow'
          onClick={() => {
            setPage(page + 1);
            setCurrPage(page);
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
          }}
          disabled={page === numPages}
        >
          <img className='arrow-right' src={icArrow} alt='to-next' />
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin-top: 2rem;
  margin-bottom: 7rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 0.8rem;
  padding: 0.8rem 1rem;
  margin: 0rem;
  background: ${theme.colors.grey30};
  color: white;
  font-size: 1.6rem;

  &:hover {
    background: ${theme.colors.green50};
    cursor: pointer;
    transform: translateY(-0.2rem);
  }

  &: [disabled] {
    background: ${theme.colors.grey50};
    cursor: pointer;
    transform: revert;
  }

  &: [aria-current] {
    background: ${theme.colors.green50};
    font-weight: bold;
    cursor: pointer;
    transform: revert;
  }
  &.arrow {
    background: ${theme.colors.grey50};
    .arrow-left {
      transform: rotateZ(-90deg);
    }
    .arrow-right {
      transform: rotateZ(90deg);
    }
  }
`;

export default Pagination;
