import React from "react";
import {hot} from "react-hot-loader";
import {createGlobalStyle} from "styled-components";
import {BrowserRouter as Router, Route} from "react-router-dom";

// Redux.
import store from "./redux/store";
import {Provider} from "react-redux";

// Components.
import Landing from "./screens/landing";

// Set globals styles.
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: #333;
    height: 100%;
    font-weight: 500;
    line-height: 24px;
    font-family: "Dosis", sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

import Example1 from "examples/example1";
import Example2 from "examples/example2";
import Example3 from "examples/example3";
import Example4 from "examples/example4";
import Example5 from "examples/example5";
import Example6 from "examples/example6";
import Example7 from "examples/example7";
import Example8 from "examples/example8";

// Career Map.
export default hot(module)(prop =>
  <Provider store={store}>
    <div>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/example1" component={Example1} />
        <Route path="/example2" component={Example2} />
        <Route path="/example3" component={Example3} />
        <Route path="/example4" component={Example4} />
        <Route path="/example5" component={Example5} />
        <Route path="/example6" component={Example6} />
        <Route path="/example7" component={Example7} />
        <Route path="/example8" component={Example8} />
      </Router>
      <GlobalStyle/>
    </div>
  </Provider>
);
