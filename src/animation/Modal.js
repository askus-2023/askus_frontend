import { keyframes } from "styled-components";

export const modalMount = keyframes`
  0% {
    transform: scale(0.7);
  }
  80% {
    transform: scale(0.97);
  }
  100% {
    transform: scale(1);
  }
`
export const modalUnmount = keyframes`
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(0);
  }
`
export const slideLeftIn = keyframes`
  0% {
    transform: translateX(44rem);
  }
  100% {
    transform: translateX(0);
  }
`