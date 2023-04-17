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
  font-size: 10px;
}
body {
  margin: 0;
  padding: 0;
  overflow-y:hidden;
  color: #323232;
  font-family: 'Noto Sans KR', sans-serif;
  .App {
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    overflow-y: hidden;
  }
button {
  padding: 0;
  outline: none;
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
}
input {
  padding: 0;
  border: none;
  &:focus {
    outline: none;
  }
  &[type="file"] {
    display: none;
  }
}
`;
