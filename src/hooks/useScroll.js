import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import scrollState from '../recoil/scroll/atom';
import { debounce } from 'lodash';

const useScroll = (ref) => {
  const [, setScrollTop] = useRecoilState(scrollState);

  const onScroll = useMemo(() => debounce(() => {
    setScrollTop(ref.current?.scrollTop);
  }, 200), [ref, setScrollTop]);

  useEffect(() => {
    setScrollTop(0);
  }, [setScrollTop]);

  useEffect(() => {
    const refObject = ref.current;
    refObject?.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      refObject?.removeEventListener('scroll', onScroll, { passive: true });
    };
  });
};

export default useScroll;
