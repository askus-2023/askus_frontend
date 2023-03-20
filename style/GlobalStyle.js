
import { createGlobalStyle } from "styled-components";
import { reset }from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}
*, *::before, *::after {
  box-sizing: border-box;
}
html {
  margin: 0;
  padding: 0;
}
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  .App {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
  }
button{
  outline:none;
  border:none;
  background: none;
  &:hover{
    cursor: pointer;
  }
}
`