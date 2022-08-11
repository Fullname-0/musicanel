import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import {AuthContextProvider} from "./store/auth-context";
import {RegistContextProvider} from "./store/regist-context";
import {SnackbarContextProvider} from "./store/snackbar-context";
import Layout from "./layout/Layout";
import {Provider} from 'react-redux';
import store from "./store";

let theme = createTheme({
    palette: {
        primary: {
            light: '#BFBDC1',
            main: '#6D6A75',
            dark: '#37323E',
            contrastText: '#fff',
        },
        secondary: {
            light: '#DEB841',
            main: '#DE9E36',
            contrastText: '#000',
        },
    },
    typography: {
        fontFamily: 'Source Sans Pro',
        h1: {
            fontSize: '124px'
        },
        body1: {
            fontSize: '18px'
        }
    }
});
theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <SnackbarContextProvider>
              <AuthContextProvider>
                  <RegistContextProvider>
                      <Provider store={store}>
                          <BrowserRouter>
                              <Layout>
                                  <App />
                              </Layout>
                          </BrowserRouter>
                      </Provider>
                  </RegistContextProvider>
              </AuthContextProvider>
          </SnackbarContextProvider>
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
