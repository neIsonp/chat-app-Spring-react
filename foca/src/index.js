import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import superGlueOutlineFont from './assets/Font/Super Glue Outline.ttf';
import styled, { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Super Glue';
    src: url('${superGlueOutlineFont}');
  }
  `;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <App />
  </React.StrictMode>
);

