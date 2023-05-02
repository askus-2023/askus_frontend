import React, { useEffect, useRef, useState, useReducer } from 'react';
import styled from 'styled-components';
import TextInput from '../../common/input/TextInput';
import ContainedButton from '../../common/button/ContainedButton';
import defaultProfile from '../../../assets/images/default-profile.png';
import icCancel from '../../../assets/icons/cancel.svg';
import icCancelRed from '../../../assets/icons/cancel-red.svg';
import icCheck from '../../../assets/icons/check.svg';
import useFormValidation from '../../../hooks/useFormValidation';
import { useMutation } from 'react-query';
import { duplicationCheck, signUp } from '../../../apis/auth';
import Spinner from '../../common/spinner/Spinner';
import OutlinedButton from '../../common/button/OutlinedButton';

export const EMAIL_ERR_MSG = '올바른 이메일 주소가 아닙니다.';
const DUPLICATE_EMAIL = '이미 가입된 이메일 주소입니다.';
export const NOT_FILLED = '이 입력란을 작성하세요.';
const NOT_CHECKED = '이메일 중복확인을 해주세요.';
const PW_CHECK_ERR_MSG = '비밀번호가 다릅니다.';

const formMap = {
  0: 'email',
  1: 'password',
  2: 'passwordCheck',
  3: 'nickname',
};

const initialState = {
  value: {
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  },
  error: {
    email: false,
    password: false,
    passwordCheck: false,
    nickname: false,
  },
  errorMsg: {
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'VALUE':
      return {
        ...state,
        value: {
          ...state.value,
          [action.field]: action.payload,
        },
      };
    case 'ERROR':
      return {
        ...state,
        error: {
          ...state.error,
          [action.field]: action.payload,
        },
      };
    case 'ERROR_MSG':
      return {
        ...state,
        errorMsg: {
          ...state.errorMsg,
          [action.field]: action.payload,
        },
      };
    default:
      return state;
  }
};

const SignUp = ({ setPhase }) => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState({});
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [duplicationChecked, setDuplicationChecked] = useState(false);
  const [duplicated, setDuplicated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const { validateEmail } = useFormValidation();

  const signup = useMutation(signUp);
  const checkEmail = useMutation(duplicationCheck);

  const uploadImage = () => {
    const file = fileInputRef.current?.files;
    if (file && file[0]) {
      setImage({ image: file[0], url: URL.createObjectURL(file[0]) });
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    const values = Object.values(formState.value);
    if (!formState.error.passwordCheck) {
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
    } else {
      return;
    }

    if (!duplicationChecked) {
      dispatch({
        type: 'ERROR',
        field: 'email',
        payload: true,
      });
      dispatch({
        type: 'ERROR_MSG',
        field: 'email',
        payload: NOT_CHECKED,
      });
      return;
    }
    if (values.every((value) => value.length)) {
      setIsLoadingSignUp(true);
      const formData = new FormData();
      formData.append('email', formState.value.email);
      formData.append('password', formState.value.password);
      formData.append('checkedPassword', formState.value.passwordCheck);
      formData.append('nickname', formState.value.nickname);
      image.image && formData.append('profileImage', image.image);
      signup.mutate(formData, {
        onSuccess: () => {
          setIsLoadingSignUp(false);
          window.URL.revokeObjectURL(image.url);
          setPhase('signin');
        },
        onError: (err) => alert(err.response?.data),
        onSettled: () => setIsLoadingSignUp(false),
      });
    }
  };

  const duplicationCheckHandler = () => {
    if (formState.value.email && formState.errorMsg.email !== EMAIL_ERR_MSG) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('email', formState.value.email);
      checkEmail.mutate(formData, {
        onSuccess: (res) => {
          setDuplicationChecked(true);
          if (res.data.duplicated) {
            setDuplicated(true);
            dispatch({
              type: 'ERROR',
              field: 'email',
              payload: true,
            });
            dispatch({
              type: 'ERROR_MSG',
              field: 'email',
              payload: DUPLICATE_EMAIL,
            });
          } else {
            setDuplicated(false);
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
        },
        onError: (res) => {
          alert(res.response.data);
        },
        onSettled: () => setIsLoading(false),
      });
    }
  };

  useEffect(() => {
    setDuplicationChecked(false);
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
  }, [formState.value.email]);

  useEffect(() => {
    const isValid = validateEmail(formState.value.email);
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
  }, [formState.value.email, validateEmail]);

  useEffect(() => {
    if (
      formState.value.passwordCheck &&
      formState.value.passwordCheck !== formState.value.password
    ) {
      dispatch({
        type: 'ERROR',
        field: 'passwordCheck',
        payload: true,
      });
      dispatch({
        type: 'ERROR_MSG',
        field: 'passwordCheck',
        payload: PW_CHECK_ERR_MSG,
      });
    } else {
      dispatch({
        type: 'ERROR',
        field: 'passwordCheck',
        payload: false,
      });
      dispatch({
        type: 'ERROR_MSG',
        field: 'passwordCheck',
        payload: '',
      });
    }
  }, [formState.value.password, formState.value.passwordCheck]);

  return (
    <Wrapper>
      <form onSubmit={signUpHandler} className='signup-form'>
        <ProfileSection>
          <label htmlFor='profile-image'>
            <img
              className='image image-profile'
              src={image?.url ?? defaultProfile}
              alt='프로필 이미지'
            />
          </label>
          <input
            ref={fileInputRef}
            id='profile-image'
            type='file'
            onChange={uploadImage}
          />
          {image.url && (
            <button onClick={() => setImage({})}>
              <img className='ic ic-cancel' src={icCancel} alt='취소' />
            </button>
          )}
        </ProfileSection>
        <div className='form-wrapper form-wrapper-signup'>
          <EmailWrapper>
            <TextInput
              type='email'
              placeholder='이메일'
              value={formState.value.email}
              onChange={(e) =>
                dispatch({
                  type: 'VALUE',
                  field: 'email',
                  payload: e.target.value,
                })
              }
              error={formState.error.email}
              errMsg={formState.errorMsg.email}
            />
            <div className='duplication-check'>
              {!duplicationChecked && (
                <DuplicationCheckButton onClick={duplicationCheckHandler}>
                  중복확인
                </DuplicationCheckButton>
              )}
              {isLoading && <StyledSpinner />}
              {duplicationChecked && duplicated && (
                <img src={icCancelRed} alt='중복 이메일' />
              )}
              {duplicationChecked && !duplicated && (
                <img src={icCheck} alt='통과' />
              )}
            </div>
          </EmailWrapper>
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
          <TextInput
            type='password'
            placeholder='비밀번호 확인'
            value={formState.value.passwordCheck}
            onChange={(e) =>
              dispatch({
                type: 'VALUE',
                field: 'passwordCheck',
                payload: e.target.value,
              })
            }
            error={formState.error.passwordCheck}
            errMsg={formState.errorMsg.passwordCheck}
          />
          <TextInput
            placeholder='닉네임'
            value={formState.value.nickname}
            onChange={(e) =>
              dispatch({
                type: 'VALUE',
                field: 'nickname',
                payload: e.target.value,
              })
            }
            error={formState.error.nickname}
            errMsg={formState.errorMsg.nickname}
          />
          <ContainedButton type='submit'>
            {isLoadingSignUp ? <Spinner color='white' /> : '회원가입'}
          </ContainedButton>
        </div>
      </form>
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  padding: 2.4rem 2rem;
  .signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;
const ProfileSection = styled.div`
  position: relative;
  label {
    cursor: pointer;
  }
  .image-profile {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }
  .ic-cancel {
    position: absolute;
    top: -1rem;
    right: -1rem;
  }
`;
const EmailWrapper = styled.div`
  position: relative;
  .duplication-check {
    position: absolute;
    top: 2.3rem;
    right: 1rem;
    transform: translateY(-50%);
    z-index: 11;
  }
`;
const DuplicationCheckButton = styled(OutlinedButton)`
  border-radius: 0.4rem;
  button {
    padding: 0.4rem 0.8rem;
    font-size: 1.2rem;
  }
`;
const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
`;
