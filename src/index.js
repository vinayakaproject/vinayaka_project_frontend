import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { PostHogProvider } from 'posthog-js/react'

import ReactGA from "react-ga4";
ReactGA.initialize("G-BRRM44PS00");

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <PostHogProvider 
          apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
          options={options}
        >
          <App />
        </PostHogProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

const SendAnalytics = ()=> {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(SendAnalytics);
