import { useCallback, useEffect, useState } from 'react';

const useScroll = (ref) => {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = useCallback(() => {
    setScrollTop(ref.current?.scrollTop);
  }, [ref]);

  useEffect(() => {
    const refObject = ref.current;
    refObject?.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      refObject?.removeEventListener('scroll', onScroll, { passive: true });
    };
  });

  return {
    scrollTop,
  };
};

export default useScroll;
