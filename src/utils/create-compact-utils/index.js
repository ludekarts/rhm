import createAction from "../create-action";
import createReducer from "../create-reducer";
import mountSelectors from "../mount-selectors";
import createReduxUtils from "../create-redux-utils";

const createCompactUtils = (namespace, utilities) => {
  const {
    reducer: utReducer,
    actions: utActions,
    initState,
    selectors,
    ...rest
  } = utilities;

  const reducer = createReducer(utReducer)(initState);

  const actions = Object.keys(utActions).reduce(
    (acc, actionName, index) => {
      if (process.env.NODE_ENV !== "production" && (!Array.isArray(utActions[actionName]) || typeof utActions[actionName][0] !== "string")) {
        throw new Error(`Incorrect action in createCompactUtils at index: ${index}. Action value should be an array: ["ACTION_NAME", () => {} or null].`);
      }
      acc[actionName] = createAction.apply(null, utActions[actionName]);
      return acc;
    }, {}
  );

  return createReduxUtils(namespace, {reducer, actions, selectors, ...rest});
}

export default createCompactUtils;
