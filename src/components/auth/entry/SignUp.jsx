import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TextInput from '../../common/input/TextInput';
import ContainedButton from '../../common/button/ContainedButton';
import defaultProfile from '../../../assets/images/default-profile.png';
import icCancel from '../../../assets/icons/cancel.svg';
import icCancelRed from '../../../assets/icons/cancel-red.svg';
import icCheck from '../../../assets/icons/check.svg';
import useFormValidation from './useFormValidation';
import { useMutation } from 'react-query';
import { duplicationCheck, signUp } from '../../../apis/auth';
import Spinner from '../../common/spinner/Spinner';
import OutlinedButton from '../../common/button/OutlinedButton';

const SignUp = ({ setPhase }) => {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [formValid, setFormValid] = useState({});
  const [image, setImage] = useState({});
  const [duplicationChecked, setDuplicationChecked] = useState(false);
  const [duplicated, setDuplicated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const { validateEmail, validatePassword, validateNickname } =
    useFormValidation();

  const signup = useMutation(signUp);
  const checkEmail = useMutation(duplicationCheck);

  const uploadImage = () => {
    const file = fileInputRef.current?.files;
    if (file && file[0]) {
      setImage({ image: file[0], url: URL.createObjectURL(file[0]) });
    }
  };

  const handleClickSignUp = async (e) => {
    e.preventDefault();
    setIsLoadingSignUp(true);
    const newFormValid = {
      ...formValid,
      EMAIL: !validateEmail(email).isValid,
      PASSWORD: !validatePassword(password).isValid,
      PASSWORD_CHECK: password !== passwordCheck,
      NICKNAME: !validateNickname(nickname).isValid,
    };
    setFormValid(newFormValid);

    if (
      duplicationChecked &&
      !duplicated &&
      !Object.values(newFormValid).includes(true)
    ) {
      const data = new URLSearchParams({
        email,
        password,
        checkedPassword: passwordCheck,
        nickname,
      });
      signup.mutate(data, {
        onSuccess: () => {
          setIsLoadingSignUp(false);
          setPhase('signin');
        },
        onError: (err) => console.log(err.response.data),
      });
    }
  };

  const handleClickDuplicationCheck = () => {
    if (email && validateEmail(email).isValid) {
      setIsLoading(true);
      const data = new URLSearchParams({
        email,
      });
      checkEmail.mutate(data, {
        onSuccess: (res) => {
          setDuplicationChecked(true);
          if (res.data.duplicated) {
            setDuplicated(true);
          } else {
            setDuplicated(false);
          }
        },
        onSettled: () => setIsLoading(false),
      });
    }
  };
  useEffect(() => {
    setDuplicationChecked(false);
  }, [email]);

  return (
    <Wrapper>
      <form onSubmit={handleClickSignUp}>
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={formValid.EMAIL}
              errMsg={validateEmail(email).errMsg}
            />
            <div className='duplication-check'>
              {!duplicationChecked && (
                <DuplicationCheckButton onClick={handleClickDuplicationCheck}>
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formValid.PASSWORD}
            errMsg={validatePassword(password).errMsg}
          />
          <TextInput
            type='password'
            placeholder='비밀번호 확인'
            required
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            error={formValid.PASSWORD_CHECK}
            errMsg={'비밀번호가 일치하지 않습니다.'}
          />
          <TextInput
            placeholder='닉네임'
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            error={formValid.NICKNAME}
            errMsg={validateNickname(nickname).errMsg}
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

  form {
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
    top: 50%;
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
