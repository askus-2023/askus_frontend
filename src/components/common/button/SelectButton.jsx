import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';

const SelectButton = ({ className, onChange, option, selected }) => {
  return (
    <Wrapper className={className}>
      <select onChange={onChange} value={selected}>
        {option.map((option, idx) => {
          return (
            <option value={option.value} key={idx}>
              {option.text}
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
    width: 10rem;
    padding: 0.6rem 0.4rem;
    color: ${theme.colors.green50};
    border: 0rem;
    border-radius: 0.6rem;
    font-size: 1.6rem;
    font-weight: bold;
    outline: none;
    text-indent: 0.2rem;
    cursor: pointer;
    &:hover {
      color: ${theme.colors.green70};
    }
  }
`;
