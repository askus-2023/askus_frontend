import { keyframes } from 'styled-components';

export const commentMount = keyframes`
  0% {
    transform: scaleY(100%) translateX(-1%);
  }
  20% {
    transform: scaleY(98%) translateX(-1%);
  }
  100% {
    display: none;
    transform: scaleY(0) translateX(-1%);
  }
`;
