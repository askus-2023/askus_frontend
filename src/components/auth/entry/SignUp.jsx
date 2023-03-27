import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import TextInput from '../../Common/Input/TextInput';
import ContainedButton from '../../Common/Button/ContainedButton';
import defaultProfile from '../../../Assets/Images/default-profile.png';
import icCancel from '../../../Assets/Icons/cancel.svg';
import useFormValidation from './useFormValidation';

const SignUp = ({ setPhase }) => {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [formValid, setFormValid] = useState({});
  const [image, setImage] = useState({});

  const { validateEmail, validatePassword, validateNickname } =
    useFormValidation();

  const uploadImage = () => {
    const file = fileInputRef.current?.files;
    if (file && file[0]) {
      setImage({ image: file[0], url: URL.createObjectURL(file[0]) });
    }
  };

  const handleClickSignUp = () => {
    const newFormValid = {
      ...formValid,
      EMAIL: !validateEmail(email).isValid,
      PASSWORD: !validatePassword(password).isValid,
      PASSWORD_CHECK: password !== passwordCheck,
      NICKNAME: !validateNickname(nickname).isValid,
    };
    setFormValid(newFormValid);

    if (!Object.values(newFormValid).includes(true)) setPhase('signin');
  };
  return (
    <Wrapper>
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
          <ContainedButton onClick={handleClickSignUp}>
            회원가입
          </ContainedButton>
        </form>
      </div>
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
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
