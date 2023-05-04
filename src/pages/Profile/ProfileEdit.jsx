import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import imageCompression from 'browser-image-compression';
import { editPassword, editProfile } from '../../apis/profile';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import icCancel from '../../assets/icons/cancel.svg';
import TextInput from '../../components/common/input/TextInput';
import useFormValidation from '../../hooks/useFormValidation';
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
  const [isImageUpdate, setIsImageUpdate] = useState(false);

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

  const { validatePassword, validateNickname } = useFormValidation();

  const uploadImage = () => {
    const file = fileInputRef.current?.files;
    if (file && file[0]) {
      setImage({ image: file[0], url: URL.createObjectURL(file[0]) });
    }
    setIsImageUpdate(true);
  };

  if (isEditProfileLoading || isEditPasswordLoading) {
    return <p>Loading...</p>;
  }

  if (editProfileError || editPasswordError) {
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

  const profileImageData = profileData.state.profileImageUrl;

  const editProSubmitHandler = async (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1, // 허용하는 최대 사이즈 지정
      maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
      useWebWorker: true, // webworker 사용 여부
    };
    const formData = new FormData();

    if (profileImageData !== image) {
      try {
        const compressedFile = await imageCompression(image?.image, options);
        const filechange = new File([compressedFile], compressedFile.name, {
          type: compressedFile.type,
        });
        formData.append('profileImage', filechange ?? image);
        setImage({ image: filechange, url: URL.createObjectURL(filechange) });

        window.localStorage.setItem('profile_img', image?.url ?? image);
      } catch (error) {
        console.log(error);
      }
    }

    formData.append('nickname', nickname);
    formData.append(
      'imageUpdated',
      isImageUpdate !== null ? isImageUpdate : false
    );
    mutateEditProfile({ accessToken, data: formData });
  };

  const editPWSubmitHandler = async (e) => {
    e.preventDefault();

    const passwordData = {
      existingPassword: curPassword,
      password: newPassword,
      checkedPassword: passwordCheck,
    };

    mutateEditPassword({ accessToken, passwordData });
    setCurPassword('');
    setNewPassword('');
    setPasswordCheck('');
  };
  return (
    <Wrapper>
      <form onSubmit={editProSubmitHandler}>
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
          className='txtinput'
        />
        <ContainedButton
          // onClick={handleClickEdit}
          className='editbt'
          type='submit'
        >
          프로필 수정하기
        </ContainedButton>
      </form>
      <div className='line'></div>
      <form onSubmit={editPWSubmitHandler}>
        <TextInput
          type='password'
          placeholder='현재 비밀번호'
          required
          value={curPassword}
          onChange={(e) => setCurPassword(e.target.value)}
          // error={formValid.PASSWORD}
          // errMsg={validatePassword(curPassword).errMsg}
          className='txtinput '
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
        <ContainedButton className='editbt' type='submit'>
          비밀번호 수정하기
        </ContainedButton>
      </form>
    </Wrapper>
  );
};

export default ProfileEdit;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto auto;
  .editbt {
    width: 40rem;
  }
  .txtinput {
    padding-bottom: 1rem;
  }
  .txtpw {
    border-bottom: 0.1rem solid ${theme.colors.grey40};
    padding-bottom: 3rem;
  }
  .line {
    border-left: 0.1rem solid ${theme.colors.grey40};
    height: 40rem;
    margin: 0 10rem;
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
