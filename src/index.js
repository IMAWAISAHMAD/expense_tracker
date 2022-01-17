import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {SpeechProvider} from "@speechly/react-client";
import {Provider} from "./context/context";
import "./index.css";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId="ca889f54-40f8-4b1a-8a8a-0759831a6a68" language="en-US">
    <Provider>
    <App />
    </Provider>
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
