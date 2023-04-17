import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from '../../common/input/TextInput';
import ContainedButton from '../../common/button/ContainedButton';
import useFormValidation from './useFormValidation';
import { useMutation } from 'react-query';
import { signIn } from '../../../apis/auth';
import Spinner from '../../common/spinner/Spinner';
import { useRecoilState } from 'recoil';
import authState from '../../../recoil/auth/atom';
import { useNavigate } from 'react-router';

const SignIn = ({ openModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(authState);
  const { validateEmail, validatePassword } = useFormValidation();
  const navigate = useNavigate();
  const signin = useMutation(signIn);

  const handleClickSignIn = (e) => {
    e.preventDefault();
    const newFormValid = {
      ...formValid,
      EMAIL: !validateEmail(email).isValid,
      PASSWORD: !validatePassword(password).isValid,
    };
    setFormValid(newFormValid);

    if (!Object.values(newFormValid).includes(true)) {
      setIsLoading(true);
      const data = new URLSearchParams({
        email,
        password,
      });
      signin.mutate(data, {
        onSuccess: (res) => {
          setAccessToken(res.data.accessToken);
          window.localStorage.setItem('refresh_token', res.data.refreshToken);
          openModal(() => false);
          navigate('/board');
        },
        onError: (res) => console.log(res),
        onSettled: () => setIsLoading(false),
      });
    }
  };

  return (
    <Wrapper>
      <div className='form-wrapper form-wrapper-signin'>
        <form onSubmit={handleClickSignIn}>
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
          <ContainedButton type='submit'>
            {isLoading ? <Spinner color='white' /> : '로그인'}
          </ContainedButton>
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
