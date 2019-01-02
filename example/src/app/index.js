import React from "react";
import {hot} from "react-hot-loader";
import {createGlobalStyle} from "styled-components";

// Redux.
import store from "./redux/store";
import {Provider} from "react-redux";

// Components.
import Landing from "./screens/landing";

// Set globals styles.
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100%;
    font-weight: 500;
    font-family: "Dosis", sans-serif;
  }
`;

// Career Map.
export default hot(module)(prop =>
  <Provider store={store}>
    <div>
      <Landing hello="there"/>
      <GlobalStyle/>
    </div>
  </Provider>
);
