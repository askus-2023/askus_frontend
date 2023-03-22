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
  margin: 0;
  padding: 0;
  color: #323232;
  .App {
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    font-size: 10px;
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
