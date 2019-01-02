import {createReducer} from "rhm";
import {createSelector} from "reselect";


// Initial state.
const init = {
  count: 0,
  const: 10,
};

// Main Reducer.
export default createReducer({
  LANDING_HELLO: ( _ , {count}) => ({count: count + 1}),
  MULTIPLY: (num, {count}) => ({count: count * num})
})(init);



// ---- Selectors ----------------

const selectors = {
  getCount: state => state.count,
  getConst: state => state.const
};

selectors.getMulti = createSelector(
  selectors.getCount,
  selectors.getConst,
  (count, constant) => {
    console.log("run selector");
    return count * constant;
  }
);

export {selectors}
