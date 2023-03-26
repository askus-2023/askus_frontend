import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../Styles/Theme';

const SelectButton = ({ className, onChange, option, selected }) => {
  return (
    <Wrapper className={className}>
      <select onChange={onChange} value={selected}>
        <option value='' disabled>
          필터
        </option>
        {option.map((option, idx) => {
          return (
            <option value={option} key={idx}>
              {option}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
};

export default SelectButton;

const Wrapper = styled.div`
  width: fit-content;
  background-color: white;
  border: 0.1rem solid ${theme.colors.green50};
  border-radius: 0.6rem;
  display: flex;
  flex-shrink: 0;

  &:hover {
    border-color: ${theme.colors.green70};
  }

  select {
    padding: 0.8rem 0.2rem;
    color: ${theme.colors.green50};
    border: 0rem;
    border-radius: 0.6rem;
    font-size: 1.8rem;
    font-weight: bold;
    outline: none;
    text-indent: 2rem;
    &:hover {
      color: ${theme.colors.green70};
    }
  }
`;
