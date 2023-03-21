import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';

const TextInput = ({
  id,
  className,
  type,
  value,
  error,
  errMsg,
  placeholder,
  onChange,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <Wrapper
      className={className}
      focus={focus}
      isValue={value.length}
      error={error}
    >
      <div className='input-field'>
        <label htmlFor={id}>{placeholder}</label>
        <input
          id={id}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type={type ?? 'text'}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && (
        <ErrorMsgWrapper>
          <span>{errMsg}</span>
        </ErrorMsgWrapper>
      )}
    </Wrapper>
  );
};

export default TextInput;

const Wrapper = styled.div`
  position: relative;
  width: 400px;
  background-color: white;

  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 8px;
    font-size: 16px;
    color: ${({ focus, error }) =>
      error
        ? theme.colors.red
        : focus
        ? theme.colors.green50
        : theme.colors.grey70};
    background-color: white;
    transform: ${({ focus, isValue, error }) =>
      error || focus || isValue
        ? 'translate(4px, -7px) scale(0.75)'
        : 'translate(6px, 14px)'};
    transform-origin: top-left;
    transition: transform 0.25s ease;
    pointer-events: none;
  }
  input {
    width: 100%;
    font-size: 16px;
    padding: 12px 15px;
    border: 1px solid
      ${({ error }) => (error ? theme.colors.red : theme.colors.grey40)};
    border-radius: 6px;
    &:focus {
      border: 2px solid;
      border-color: ${({ error }) =>
        error ? theme.colors.red : theme.colors.green50};
    }
  }
`;
const ErrorMsgWrapper = styled.div`
  padding: 4px 12px;
  span {
    font-size: 12px;
    color: ${theme.colors.red};
    font-weight: bold;
  }
`;
