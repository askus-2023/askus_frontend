import { useCallback, useMemo } from 'react';

const useFormValidation = () => {
  const emailRegEx = useMemo(() => /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, [])
      
  const validateEmail = useCallback((email) => {
    if (!email || !emailRegEx.test(email)) {
      return false;
    }
    return true;
  }, [emailRegEx]);

  // const validatePassword = useCallback((password) => {
  //   if (!password) {
  //     return false;
  //   }
  //   return true;
  // }, []);

  return {
    validateEmail,
  };
};

export default useFormValidation;
