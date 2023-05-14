import { useEffect, useState } from 'react';

const FontSizeTransition = (scrollStart, scrollEnd, start, end) => {
  const [fontSize, setFontSize] = useState(start);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition >= scrollStart && scrollPosition <= scrollEnd) {
        const fontSize =
          start -
          ((scrollPosition - scrollStart) / (scrollEnd - scrollStart)) *
            (start - end);
        setFontSize(fontSize);
      } else if (scrollPosition < scrollStart) {
        setFontSize(start);
      } else if (scrollPosition > scrollEnd) {
        setFontSize(end);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [end, scrollEnd, scrollStart, start]);

  return fontSize;
};

export default FontSizeTransition;
