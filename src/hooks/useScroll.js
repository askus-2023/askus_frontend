import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import scrollState from '../recoil/scroll/atom';
import { throttle } from 'lodash';

const useScroll = (ref) => {
  const [, setScrollTop] = useRecoilState(scrollState);

  const onScroll = useMemo(
    () =>
      throttle(() => {
        setScrollTop(ref.current?.scrollTop);
      }, 300),
    [ref, setScrollTop]
  );

  useEffect(() => {
    setScrollTop(0);
  }, [setScrollTop]);

  useEffect(() => {
    const refObject = ref.current;
    refObject?.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      refObject?.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, [onScroll, ref]);
};

export default useScroll;
