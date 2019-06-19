// DESCRIPTION:
// Here Redux Store is set up.

import rhm from "rhm";
import logger from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

// Root Reducer.
import reducer from "./reducers";

// Apply additional middleware.
const middleware = process.env.NODE_ENV !== "production"
  ? composeWithDevTools(applyMiddleware(rhm, logger))
  : applyMiddleware(rhm);

// Main Store.
const store = createStore(reducer, middleware);

// Hot Reloading.
if (module.hot) {
  module.hot.accept("./reducers", () =>
    store.replaceReducer(require("./reducers").default)
  );
}

// Export Store.
export default store;
