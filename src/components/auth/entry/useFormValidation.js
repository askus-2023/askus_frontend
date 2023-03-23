const useFormValidation = () => {
  const validateEmail = (email) => {
    const emailRegEx =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!email || !emailRegEx.test(email)) {
      return { isValid: false, errMsg: '이메일을 확인해주세요' };
    }
    return { isValid: true };
  };

  const validatePassword = (password) => {
    if (!password) {
      return { isValid: false, errMsg: '비밀번호를 입력해주세요' };
    }
    return { isValid: true };
  };

  const validateNickname = (nickname) => {
    if (!nickname) {
      return { isValid: false, errMsg: '닉네임을 입력해주세요' };
    }
    return { isValid: true };
  };

  return {
    validateEmail,
    validatePassword,
    validateNickname,
  };
};

export default useFormValidation;
