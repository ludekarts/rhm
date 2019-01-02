import {uid, isObject} from "../../helpers";
import mountSelectors from "../mount-selectors";


// ---- Create Redux Utilities ----------------

const createReduxUtils = (storeRoot, utilities) => {

  if (process.env.NODE_ENV !== "production") {

    if (typeof storeRoot !== "string" && storeRoot !== null)
      throw new Error(`Incorrect argument. Method "createReduxUtils()" requires "storeRoot" to be a string or null`);

    if (!isObject(utilities))
      throw new Error(`Incorrect argument. Method "createReduxUtils()" requires Object as a second argument`);

    if (!utilities.reducer)
      throw new Error(`No reducer in "createReduxUtils()"`);

  }

  // Reducer as "default" export OR regular object.
  let reducer = utilities.reducer.default || utilities.reducer;

  // Create random "storeRoot" to avoid names colision.
  if (storeRoot === null) storeRoot = uid();

  // Set storeHook for rootReducer.
  utilities.storeHook = reducer ? {[storeRoot]: reducer} : {};

  // Setup selectors.
  if (process.env.NODE_ENV !== "production") {
    if (utilities.reducer.selectors && utilities.selectors)
      throw new Error(`Two "selectors" objects detected in "${storeRoot}". Make sure to have only one "selectors" object in your utilities.`);
  }

  const selectors = utilities.reducer.selectors
    ? mountSelectors(utilities.reducer.selectors, storeRoot)
    : utilities.selectors
      ? mountSelectors(utilities.selectors, storeRoot)
      : null;

  if (selectors) {
    utilities.selectors = selectors;
    // Add selectors to the reducer object to make it consistent.
    if (!reducer.selectors && utilities.selectors) {
      reducer.selectors = utilities.selectors;
    }
  }

  return utilities;
}

export default createReduxUtils;
