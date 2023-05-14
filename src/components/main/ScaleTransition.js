import { useEffect, useState } from 'react';

// (3600, 4000, 154, 1)

const ScaleTransition = (
  scrollStart,
  scrollEnd,
  startTop,
  startScale,
  mediaRef
) => {
  const [top, setTop] = useState(154);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const playMedia = () => {
        if (mediaRef.current) {
          mediaRef.current.play();
        }
      };

      if (scrollPosition >= scrollStart && scrollPosition <= scrollEnd) {
        const scale =
          1 +
          ((scrollPosition - scrollStart) / (scrollEnd - scrollStart)) * 0.5;
        const top =
          startTop -
          ((scrollPosition - scrollStart) / (scrollEnd - scrollStart)) * 19;
        playMedia();
        setScale(scale);
        setTop(top);
      } else if (scrollPosition < scrollStart) {
        setScale(1);
        setTop(154);
      } else if (scrollPosition > scrollEnd) {
        setScale(startScale + 0.5);
        setTop(startTop - 19);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mediaRef, scrollEnd, scrollStart, startScale, startTop]);

  return { top, scale };
};

export default ScaleTransition;
