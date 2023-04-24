import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import scrollState from '../recoil/scroll/atom';

const useScroll = (ref) => {
  const [, setScrollTop] = useRecoilState(scrollState);

  const onScroll = useCallback(() => {
    setScrollTop(ref.current?.scrollTop);
  }, [ref, setScrollTop]);

  useEffect(() => {
    setScrollTop(0);
  }, []);

  useEffect(() => {
    const refObject = ref.current;
    refObject?.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      refObject?.removeEventListener('scroll', onScroll, { passive: true });
    };
  });
};

export default useScroll;
