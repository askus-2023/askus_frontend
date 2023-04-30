import { useMemo } from 'react';
import { debounce } from 'lodash';

const useFormValidation = () => {
  const validateEmail = useMemo(() => debounce((email) => {
    const emailRegEx =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!email || !emailRegEx.test(email)) {
      return false;
    }
    return true;
  }, 300), []);

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
