import { useCallback } from 'react';

const useDatetimeFormat = () => {
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 12 * month + 5 * day;

  const checkDatetime = useCallback(() => {
    return {
      isSeconds: (timeDiff) => timeDiff >= second && timeDiff < minute,
      isMinutes: (timeDiff) => timeDiff >= minute && timeDiff < hour,
      isHours: (timeDiff) => timeDiff >= hour && timeDiff < day,
      isDays: (timeDiff) => timeDiff >= day && timeDiff < month,
      isMonths: (timeDiff) => timeDiff >= month && timeDiff < year,
      isYears: (timeDiff) => timeDiff >= year,
    };
  }, [day, hour, minute, month, year]);

  const displayDatetime = useCallback(
    (timeDiff) => {
      const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

      if (checkDatetime().isSeconds(-timeDiff)) {
        return '방금 전';
      }
      if (checkDatetime().isMinutes(-timeDiff)) {
        return formatter.format(Math.ceil(timeDiff / minute), 'minute');
      }
      if (checkDatetime().isHours(-timeDiff)) {
        return formatter.format(Math.ceil(timeDiff / hour), 'hour');
      }
      if (checkDatetime().isDays(-timeDiff)) {
        return formatter.format(Math.ceil(timeDiff / day), 'day');
      }
      if (checkDatetime().isMonths(-timeDiff)) {
        return formatter.format(Math.ceil(timeDiff / month), 'month');
      }
      if (checkDatetime().isYears(-timeDiff)) {
        return formatter.format(Math.ceil(timeDiff / year), 'year');
      }
    },
    [checkDatetime, day, hour, minute, month, year]
  );

  return {
    displayDatetime,
  };
};

export default useDatetimeFormat;
