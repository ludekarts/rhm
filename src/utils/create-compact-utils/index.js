import createAction from "../create-action";
import createReducer from "../create-reducer";
import createReduxUtils from "../create-redux-utils";

// Same as Create-Redux-Utils but allows developer to use compact notation
// that can be putted in single file instead spreading the logic across multiple files.
//
// USAGE:
/*

export default createCompactUtils("utilsName", {

  initState: {},

  reducer: {
    ACTION_NAME: ({payload, state, args}) => ({})
  },

  actions: {
    actionName: ["ACTION_NAME", value / () => {} / undefined],
  },

  selectors: {}

});

*/

const createCompactUtils = (namespace, utilities) => {
  const {
    reducer: utReducer,
    actions: utActions,
    initState,
    selectors,
    ...rest
  } = utilities;


  const reducer = {
    default: createReducer(utReducer)(initState),
    // Add selectors to the reducer so it can preserve its original form after extending.
    selectors
  };

  const actions = Object.keys(utActions).reduce(
    (acc, actionName, index) => {
      if (process.env.NODE_ENV !== "production") {
        if (!Array.isArray(utActions[actionName]) || typeof utActions[actionName][0] !== "string") {
          throw new Error(`Incorrect action in createCompactUtils at index: ${index}. Action value should be an array: ["ACTION_NAME", () => {} or null].`);
        }
      }
      acc[actionName] = createAction.apply(null, utActions[actionName]);
      return acc;
    }, {}
  );

  return createReduxUtils(namespace, {reducer, actions, ...rest});
}

export default createCompactUtils;
