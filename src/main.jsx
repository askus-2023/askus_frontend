import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './Styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './Styles/Theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/'>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
