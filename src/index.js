import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import ScrollTop from "./hooks/useScrollTop";
import { Provider } from "react-redux";
import store from "./store";
import { S3LocationContextProvider } from "./contexts/S3LocationContext";
 
import './App.scss';

const helmetContext = {};

ReactDOM.render(
  <HelmetProvider context={helmetContext}>
    <Provider store={store}>
      <SidebarProvider>
        <S3LocationContextProvider>
          <BrowserRouter>
            <ScrollTop />
            <App />
          </BrowserRouter>
        </S3LocationContextProvider>
      </SidebarProvider>
    </Provider>
  </HelmetProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
