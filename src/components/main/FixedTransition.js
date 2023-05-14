import { useEffect, useState } from 'react';

const FixedTransition = (
  scrollStart,
  scrollEnd,
  fixPosition,
  movePosition,
  endPosition
) => {
  const [position1, setPosition1] = useState('relative');
  const [position2, setPosition2] = useState('relative');
  const [top1, setTop1] = useState(null);
  const [top2, setTop2] = useState(71);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition >= scrollStart && scrollPosition <= scrollEnd) {
        setPosition1('fixed');
        setPosition2('fixed');
        setTop1(28);
        setTop2(71);
      } else if (scrollPosition < scrollStart) {
        setPosition1('relative');
        setPosition2('relative');
        setTop1(0);
        setTop2(38);
      } else if (scrollPosition >= scrollEnd && scrollPosition <= fixPosition) {
        setPosition2('fixed');
        const Top2 =
          71 - ((scrollPosition - scrollEnd) / (fixPosition - scrollEnd)) * 32;
        setTop2(Top2);
      } else if (scrollPosition >= 3174 && scrollPosition <= movePosition) {
        const top = 28 - ((scrollPosition - 3174) / 276) * 30;
        const top2 = 39 - ((scrollPosition - 3174) / 276) * 30;
        setTop1(top);
        setTop2(top2);
      } else if (
        scrollPosition >= movePosition &&
        scrollPosition <= endPosition
      ) {
        const top2 =
          9 -
          ((scrollPosition - movePosition) / (endPosition - movePosition)) * 9;
        setTop2(top2);
      } else if (scrollPosition > endPosition) {
        setPosition1('relative');
        setTop1(0);
        setPosition2('relative');
        setTop2(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [endPosition, fixPosition, movePosition, scrollEnd, scrollStart]);

  return { position1, position2, top1, top2 };
};

export default FixedTransition;
