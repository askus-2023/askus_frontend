import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`

}
${reset}
*, *::before, *::after {
  box-sizing: border-box;
}
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  color: #323232;
  .App {
    width: 100vw;
    height: 100vh;
  }
button {
  outline: none;
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
}
input {
  border: none;
  &:focus {
    outline: none;
  }
}
`;
