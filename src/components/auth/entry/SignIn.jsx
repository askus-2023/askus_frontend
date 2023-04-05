import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from '../../common/input/TextInput';
import ContainedButton from '../../common/button/ContainedButton';
import useFormValidation from './useFormValidation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState({});

  const { validateEmail, validatePassword } = useFormValidation();
  const handleClickSignIn = () => {
    const newFormValid = {
      ...formValid,
      EMAIL: !validateEmail(email).isValid,
      PASSWORD: !validatePassword(password).isValid,
    };
    setFormValid(newFormValid);
  };

  return (
    <Wrapper>
      <div className='form-wrapper form-wrapper-signin'>
        <form>
          <TextInput
            type='email'
            placeholder='이메일'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={formValid.EMAIL}
            errMsg={validateEmail(email).errMsg}
          />
          <TextInput
            type='password'
            placeholder='비밀번호'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formValid.PASSWORD}
            errMsg={validatePassword(password).errMsg}
          />
          <ContainedButton onClick={handleClickSignIn}>로그인</ContainedButton>
        </form>
      </div>
    </Wrapper>
  );
};

export default SignIn;

const Wrapper = styled.div`
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
