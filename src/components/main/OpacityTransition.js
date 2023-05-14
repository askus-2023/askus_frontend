import { useEffect, useState } from 'react';

const OpacityTransition = (scrollStart, scrollEnd) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition >= scrollStart && scrollPosition <= scrollEnd) {
        const opacity =
          (scrollPosition - scrollStart) / (scrollEnd - scrollStart);
        setOpacity(opacity);
      } else if (scrollPosition < scrollStart) {
        setOpacity(0);
      } else if (scrollPosition > scrollEnd) {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollEnd, scrollStart]);

  return opacity;
};

export default OpacityTransition;
