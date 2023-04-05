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
  required,
  onChange,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <Wrapper
      className={className}
      focus={focus}
      isValue={value?.length}
      error={error}
    >
      <div className='input-field'>
        <label htmlFor={id}>{placeholder}</label>
        <input
          id={id}
          required={required}
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
  width: 40rem;
  min-height: 4.6rem;
  margin: 1rem 0;
  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 0.8rem;
    font-size: 1.6rem;
    color: ${({ focus, error }) =>
      error
        ? theme.colors.red
        : focus
        ? theme.colors.green50
        : theme.colors.grey50};
    background-color: white;
    transform: ${({ focus, isValue, error }) =>
      error || focus || isValue
        ? 'translate(0.4rem, -0.7rem) scale(0.75)'
        : 'translate(0.6rem, 1.4rem)'};
    transform-origin: top-left;
    transition: transform 0.25s ease;
    pointer-events: none;
  }
  input {
    width: 100%;
    font-size: 1.6rem;
    background-color: white;
    padding: 1.2rem 1.5rem;
    border: 0.1rem solid
      ${({ error }) => (error ? theme.colors.red : theme.colors.grey30)};
    border-radius: 0.6rem;
    &:focus {
      border: 0.2rem solid;
      border-color: ${({ error }) =>
        error ? theme.colors.red : theme.colors.green50};
    }
  }
`;
const ErrorMsgWrapper = styled.div`
  padding: 0.4rem 1.2rem;
  span {
    font-size: 1.2rem;
    color: ${theme.colors.red};
    font-weight: bold;
  }
`;
