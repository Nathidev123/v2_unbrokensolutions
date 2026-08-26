import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { OrderContextProvider } from './context/orderContext';
import { RoadFreightContextProvider } from './context/freightContext';
import { FormContextProvider } from './context/FormContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OrderContextProvider>
    <RoadFreightContextProvider>
    <FormContextProvider>
    <App />
    </FormContextProvider>
    </RoadFreightContextProvider>
    </OrderContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

