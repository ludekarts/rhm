import {isPrimitive, isObject} from "../../helpers";
import mergeStateObjects from "../merge-state-objects";

// Create Reducer Helper.
// Create reducer object. NOTE: All objects from the reducer function will be flat merge with default state
//
// USAGE:
/*

  const reducer = createReducer({
    ACTION_TYPE_A: ({payload, state, args}) => ({key: value}),
    ACTION_TYPE_B: ({payload, state, args}) => value,
    ACTION_TYPE_C: {key: value},
    ACTION_TYPE_D: value
  }, ...)(initialState, ...);

*/
const createReducer = (...args) => {
  const cases = args.reduce((acc, _case, index) => {

    if (process.env.NODE_ENV !== "production") {
      if (!isObject(_case)) {
        throw new Error(`Incorrect argument in "createReducer()" at index: [${index}]. All arguments should be Objects`);
      }
    }

    Object.keys(_case).forEach((action_type, caseIndex) => {
      acc[action_type] = _case[action_type];
    });

    return acc;
  }, {});

  return (...initialState) => {

    if (process.env.NODE_ENV !== "production") {
      if (!initialState.length) {
        throw new Error(`Missing initial state in "createReducer()"`);
      }
    }

    // Allow for merging multiple objects in one initialState.
    const mergedInitialState = initialState.length === 1
      ? initialState[0]
      : mergeStateObjects(initialState);

    return (state = mergedInitialState, action, exit = false) => {

      // Exit with reducer's args & initialState => for actions customization.
      if (state === null && action === null && exit) return [args, initialState];

      // Standard Reducer.
      const reducer = cases[action.type];

      // Wildcard-Error Reducer.
      const wildcard = cases["*_ERROR"];

      return reducer
        // Default reducing logic.
        ? reduce(reducer, action, state)
        // Wildcard-Error handling.
        : action.type.includes("_ERROR") && wildcard
          ? reduce(wildcard, action, state)
          // No action.
          : state;
    }
  }
}

export default createReducer;


// ---- Default reducing logic ----------------

function reduce(reducer, action, state) {
  if (isPrimitive(reducer)) {
    return reducer;
  }
  else if (typeof reducer === "function") {
    const itm = reducer({
      state: state,
      args: action.args,
      payload: action.payload
    });
    return isPrimitive(itm) ? itm : {...state, ...itm};
  }
  // Plain object.
  else {
    return {...state, ...reducer};
  }
}
