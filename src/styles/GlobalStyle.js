import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import 'react-quill/dist/quill.snow.css';

export const GlobalStyle = createGlobalStyle`
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
strong { font-weight: bold; }
em { font-style: italic; }
.ql-snow .ql-picker.ql-size .ql-picker-label::before, 
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: attr(data-value);
}
.ql-align-center {
  margin: 0 auto;
}
.ql-align-right {
  margin: 0 0 0 auto;
}
.ql-bg-black {
  background-color: #000;
}
.ql-bg-red {
  background-color: #e60000;
}
.ql-bg-orange {
  background-color: #f90;
}
.ql-bg-yellow {
  background-color: #ff0;
}
.ql-bg-green {
  background-color: #008a00;
}
.ql-bg-blue {
  background-color: #06c;
}
.ql-bg-purple {
  background-color: #93f;
}
.ql-color-white {
  color: #fff;
}
.ql-color-red {
  color: #e60000;
}
.ql-color-orange {
  color: #f90;
}
.ql-color-yellow {
  color: #ff0;
}
.ql-color-green {
  color: #008a00;
}
.ql-color-blue {
  color: #06c;
}
.ql-color-purple {
  color: #93f;
}
`;
