import { keyframes } from 'styled-components';

export const popupMount = keyframes`
  0% {
    transform: scale(0.7);
  }
  80% {
    transform: scale(0.97);
  }
  100% {
    transform: scale(1);
  }
`;
export const popupUnmount = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.4);
  }
`;
