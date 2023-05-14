import { useEffect, useState } from 'react';

const SlideXTransition = (scrollStart, scrollEnd, start, end) => {
  const [translateX, setTranslateX] = useState(start);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition >= scrollStart && scrollPosition <= scrollEnd) {
        const translateX =
          start -
          ((scrollPosition - scrollStart) / (scrollEnd - scrollStart)) *
            (start - end);
        setTranslateX(translateX);
      } else if (scrollPosition < scrollStart) {
        setTranslateX(start);
      } else if (scrollPosition > scrollEnd) {
        setTranslateX(end);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [end, scrollEnd, scrollStart, start]);

  return translateX;
};

export default SlideXTransition;
