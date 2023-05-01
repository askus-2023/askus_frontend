import React, { useRef, useState } from 'react';
import useScroll from '../../hooks/useScroll';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { editPassword, editProfile } from '../../apis/profile';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import profile from '../../assets/images/default-profile.png';
import icCancel from '../../assets/icons/cancel.svg';
import TextInput from '../../components/common/input/TextInput';
import useFormValidation from '../../components/auth/entry/useFormValidation';
import ContainedButton from '../../components/common/button/ContainedButton';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../recoil/auth/accessToken';

const ProfileEdit = () => {
  const profileData = useLocation();
  const fileInputRef = useRef(null);
  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState(profileData.state.nickname);
  const [formValid, setFormValid] = useState({});
  const [image, setImage] = useState(profileData.state.profileImageUrl);

  const accessToken = useRecoilValue(accessTokenState);
  const {
    mutate: mutateEditPassword,
    isLoading: isEditPasswordLoading,
    error: editPasswordError,
  } = useMutation(editPassword);
  const {
    mutate: mutateEditProfile,
    isLoading: isEditProfileLoading,
    error: editProfileError,
  } = useMutation(editProfile);

  const ref = useRef(null);
  useScroll(ref);

  // console.log(profileData.state);

  const { validatePassword, validateNickname } = useFormValidation();

  const uploadImage = () => {
    const file = fileInputRef.current?.files;
    if (file && file[0]) {
      setImage({ image: file[0], url: URL.createObjectURL(file[0]) });
    }
  };

  if (isEditPasswordLoading || isEditProfileLoading) {
    return <p>Loading...</p>;
  }

  if (editPasswordError || editProfileError) {
    let pwError = '';
    let proError = '';
    if (editPasswordError) {
      pwError = `<p>Error: ${editPasswordError.message}</p>`;
    }
    if (editProfileError) {
      proError = `<p>Error: ${editProfileError.message}</p>`;
    }
    return pwError + proError;
  }

  const handleClickEdit = () => {
    const editFormValid = {
      ...formValid,
      // CURPASSWORD: ,
      PASSWORD: !validatePassword(newPassword).isValid,
      PASSWORD_CHECK: newPassword !== passwordCheck,
      NICKNAME: !validateNickname(nickname).isValid,
    };
    setFormValid(editFormValid);
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();
    const passwordData = {
      existingPassword: '',
      password: newPassword,
      checkedPassword: passwordCheck,
    };

    const formData = new FormData();
    formData.append('profileImage', image?.url ?? image);

    const profileData = {
      email: 'test123@test.com',
      nickname: nickname,
    };

    mutateEditProfile({ accessToken, profileData });
    mutateEditPassword({ accessToken, passwordData });
  };

  return (
    <Wrapper ref={ref}>
      <form onSubmit={editSubmitHandler}>
        <ProfileSection>
          <label htmlFor='profile-image'>
            <img
              className='image image-profile'
              src={image?.url ?? image}
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
          className='txtinput txtname'
        />
        <TextInput
          type='password'
          placeholder='현재 비밀번호'
          required
          value={curPassword}
          onChange={(e) => setCurPassword(e.target.value)}
          error={formValid.PASSWORD}
          errMsg={validatePassword(curPassword).errMsg}
          className='txtinput'
        />
        <TextInput
          type='password'
          placeholder='새 비밀번호'
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={formValid.PASSWORD}
          errMsg={validatePassword(newPassword).errMsg}
          className='txtinput'
        />
        <TextInput
          type='password'
          placeholder='새 비밀번호 확인'
          required
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          error={formValid.PASSWORD_CHECK}
          errMsg={'비밀번호가 일치하지 않습니다.'}
          className='txtinput'
        />
        <ContainedButton
          onClick={handleClickEdit}
          className='editbt'
          type='submit'
        >
          수정하기
        </ContainedButton>
      </form>
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
    padding-bottom: 1rem;
  }
  .txtname {
    border-bottom: 0.1rem solid ${theme.colors.grey40};
    padding-bottom: 3rem;
  }
`;

const ProfileSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
