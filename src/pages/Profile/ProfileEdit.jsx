import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import profile from '../../assets/images/default-profile.png';
import icCancel from '../../assets/icons/cancel.svg';
import Header from '../../components/header/Header';
import TextInput from '../../components/common/input/TextInput';
import useFormValidation from '../../components/auth/entry/useFormValidation';
import ContainedButton from '../../components/common/button/ContainedButton';
import useScroll from '../../hooks/useScroll';

const ProfileEdit = () => {
  const fileInputRef = useRef(null);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [formValid, setFormValid] = useState({});
  const [image, setImage] = useState({});

  const ref = useRef(null);
  const { scrollTop } = useScroll(ref);

  const { validatePassword, validateNickname } = useFormValidation();

  const uploadImage = () => {
    const file = fileInputRef.current?.files;
    if (file && file[0]) {
      setImage({ image: file[0], url: URL.createObjectURL(file[0]) });
    }
  };

  const handleClickEdit = () => {
    const editFormValid = {
      ...formValid,
      PASSWORD: !validatePassword(password).isValid,
      PASSWORD_CHECK: password !== passwordCheck,
      NICKNAME: !validateNickname(nickname).isValid,
    };
    setFormValid(editFormValid);
  };

  return (
    <Wrapper ref={ref}>
      <Header scrollTop={scrollTop} />
      <ProfileSection>
        <label htmlFor='profile-image'>
          <img
            className='image image-profile'
            src={image?.url ?? profile}
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
      <TextInput
        placeholder='닉네임'
        required
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        error={formValid.NICKNAME}
        errMsg={validateNickname(nickname).errMsg}
        className='txtinput'
      />
      <TextInput
        type='password'
        placeholder='비밀번호'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={formValid.PASSWORD}
        errMsg={validatePassword(password).errMsg}
        className='txtinput'
      />
      <TextInput
        type='password'
        placeholder='비밀번호 확인'
        required
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
        error={formValid.PASSWORD_CHECK}
        errMsg={'비밀번호가 일치하지 않습니다.'}
        className='txtinput'
      />
      <ContainedButton onClick={handleClickEdit} className='editbt'>
        수정하기
      </ContainedButton>
    </Wrapper>
  );
};

export default ProfileEdit;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 13rem auto auto;
  overflow-y: auto;
  .editbt {
    width: 40rem;
  }
  .txtinput {
    margin-bottom: 3rem;
  }
`;

const ProfileSection = styled.div`
  position: relative;
  label {
    cursor: pointer;
  }
  .image-profile {
    width: 14rem;
    height: 14rem;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 3rem;
  }
  .ic-cancel {
    position: absolute;
    top: -1rem;
    right: -1rem;
  }
`;
