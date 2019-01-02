import {createSelector} from "reselect"
import {createReducer, bindIdentitySelectors} from "rhm"

// Initial state.
const init = {
  hit: 0
}

// Main Reducer.
export default createReducer({
  OVERVIEW_HELLO: ( _ , {hit}) => ({hit: hit + 1})
})(init)



// ---- Selectors ----------------

const selectors = {
  getHits: state => state.hit
}

export {selectors}
