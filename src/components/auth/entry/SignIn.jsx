import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import TextInput from '../../common/input/TextInput';
import ContainedButton from '../../common/button/ContainedButton';
import useFormValidation from '../../../hooks/useFormValidation';
import { useMutation } from 'react-query';
import { signIn } from '../../../apis/auth';
import Spinner from '../../common/spinner/Spinner';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../../recoil/auth/accessToken';
import { reducer, EMAIL_ERR_MSG, NOT_FILLED } from './SignUp';

const BAD_CREDENTIALS = '이메일 또는 비밀번호가 맞지 않습니다.';

const formMap = {
  0: 'email',
  1: 'password',
};

const initialState = {
  value: {
    email: '',
    password: '',
  },
  error: {
    email: false,
    password: false,
  },
  errorMsg: {
    email: '',
    password: '',
  },
};

const SignIn = ({ closeModal }) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const { validateEmail } = useFormValidation();
  const signin = useMutation(signIn);

  const emailChangeHandler = (e) => {
    dispatch({
      type: 'VALUE',
      field: 'email',
      payload: e.target.value,
    });
    const isValid = validateEmail(e.target.value);
    if (formState.value.email && !isValid) {
      dispatch({
        type: 'ERROR',
        field: 'email',
        payload: true,
      });
      dispatch({
        type: 'ERROR_MSG',
        field: 'email',
        payload: EMAIL_ERR_MSG,
      });
    } else {
      dispatch({
        type: 'ERROR',
        field: 'email',
        payload: false,
      });
      dispatch({
        type: 'ERROR_MSG',
        field: 'email',
        payload: '',
      });
    }
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const values = Object.values(formState.value);
    for (let i = 0; i < values.length; i++) {
      if (!values[i]) {
        dispatch({
          type: 'ERROR',
          field: formMap[i],
          payload: true,
        });
        dispatch({
          type: 'ERROR_MSG',
          field: formMap[i],
          payload: NOT_FILLED,
        });
      } else {
        dispatch({
          type: 'ERROR',
          field: formMap[i],
          payload: false,
        });
        dispatch({
          type: 'ERROR_MSG',
          field: formMap[i],
          payload: '',
        });
      }
    }
    if (values.every((value) => value.length)) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('email', formState.value.email);
      formData.append('password', formState.value.password);

      signin.mutate(formData, {
        onSuccess: (res) => {
          window.localStorage.setItem('profile_img', res.data.imageUrl);
          window.localStorage.setItem('nickname', res.data.nickname);
          window.localStorage.setItem('email', res.data.email);
          setAccessToken(res.data.accessToken);
          window.localStorage.setItem('refresh_token', res.data.refreshToken);
          closeModal(false);
        },
        onError: (res) => {
          if (res.response?.data?.message === 'Bad credentials') {
            dispatch({
              type: 'ERROR',
              field: 'email',
              payload: true,
            });
            dispatch({
              type: 'ERROR',
              field: 'password',
              payload: true,
            });
            dispatch({
              type: 'ERROR_MSG',
              field: 'password',
              payload: BAD_CREDENTIALS,
            });
          }
        },
        onSettled: () => setIsLoading(false),
      });
    }
  };

  return (
    <Wrapper>
      <div className='form-wrapper form-wrapper-signin'>
        <form onSubmit={signInHandler}>
          <TextInput
            type='email'
            placeholder='이메일'
            value={formState.value.email}
            onChange={emailChangeHandler}
            error={formState.error.email}
            errMsg={formState.errorMsg.email}
          />
          <TextInput
            type='password'
            placeholder='비밀번호'
            value={formState.value.password}
            onChange={(e) =>
              dispatch({
                type: 'VALUE',
                field: 'password',
                payload: e.target.value,
              })
            }
            error={formState.error.password}
            errMsg={formState.errorMsg.password}
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
