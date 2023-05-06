import { keyframes } from 'styled-components';

export const chatMount = keyframes`
  from {
    transform: translateY(2rem);
    opacity: 0.3;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
export const chatUnmount = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(2rem);
    opacity: 0.3;
  }
`;
