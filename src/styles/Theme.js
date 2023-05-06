import { css } from 'styled-components';

const colors = {
  green10: '#EEFFEE',
  green30: '#8EEAA0',
  green50: '#3DD666',
  green70: '#27B94E',
  green90: '#23A445',
  grey90: '#323232',
  grey70: '#616161',
  grey50: '#9E9E9E',
  grey40: '#BDBDBD',
  grey30: '#E0E0E0',
  grey20: '#EEEEEE',
  grey10: '#F5F5F5',
  red: '#F22D50',
  tomato: '#FF6347',
};

const options = {
  scrollBar: css`
    ::-webkit-scrollbar {
      width: 0.6rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #e0e0e0;
      border-radius: 1.2rem;
      &:hover {
        background-color: #bdbdbd;
      }
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
  `,
};

export const theme = { colors, options };
