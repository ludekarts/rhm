import {uid, isObject} from "../helpers"
import createAction from "create-action"
import createReducer from "create-reducer"
import combineMountingPoints from "combine-mounting-points"

import mountSelectors from "../helpers/mount-selectors"
import annotateActions from "../helpers/annotate-actions"
import annotateReducer from "../helpers/annotate-reducer"

// Create Redux Utilities.
// createReduxUtils({reducer, actions, consts, combinne, storeRoot, ...}, namespace) => ({storeHook, actions, selectors, consts, ...})
//
// Provides mounting point for rootReducer (const.STORE_ROOT) and allows to annotate "reducer", "actions"
// and "selectors" of component with custom namespace in case developer want to duplicate functionality in a cheap way.
//
// NOTE: When You're creating your Selectros you can wrap them in a function: root => ({selcetors})
//       to supply them with dynamic "STORE_ROOT" key.


// ---- Redux Utilities ----------------

const createReduxUtils = (utilities, namespace) => {

  if (!isObject(utilities))
    throw new Error(`Incorrect argument. Method "createReduxUtils()" requires Object as an argument`)

  if (!utilities.reducer) {
    if (!utilities.combine) {
      throw new Error(`No "reducer" or "combine" property in "createReduxUtils()"`)
    }
    else {
      let {combine, ...rest} = utilities
      return {storeHook: combineMountingPoints(combine), ...rest}
    }
  }

  let {consts, actions, combine, storeRoot, ...rest} = utilities
  // Reducer as default export OR regular object.
  let reducer = utilities.reducer.default || utilities.reducer

  storeRoot = storeRoot && typeof storeRoot === "string" ? storeRoot : utilities.consts ? utilities.consts.STORE_ROOT : undefined

  // Create random "storeRoot" to avoid names colision.
  if (!storeRoot && reducer) {
    storeRoot = uid()
    console.warn(`There is no STORE_ROOT constant or "storeRoot" property name to supply "storeHook". Instead UID: "${storeRoot}" was generated.`)
  }

  // Annotate Action_Types and Reducers with given namespace.
  if (namespace) {
    actions = annotateActions(actions, namespace)
    reducer = annotateReducer(reducer, namespace)
  }

  // Set storeHook fro rootReducer.
  const storeHook = reducer ? {[storeRoot]: reducer} : {}

  // Setup selectors.
  const reducerSelector = utilities.reducer.selectors ? mountSelectors(utilities.reducer.selectors, storeRoot) : {}
  const selectors = utilities.selectors ? {...reducerSelector, ...utilities.selectors} : reducerSelector

  // Explicite create utilities that exist.
  const annotatedUtils = {storeHook}
  if (consts) annotatedUtils.consts = consts
  if (actions) annotatedUtils.actions = actions
  if (selectors) annotatedUtils.selectors = selectors

  // Combine additional storeHooks.
  if (combine) annotatedUtils.storeHook = {...combineMountingPoints(combine), ...annotatedUtils.storeHook}

  return {...annotatedUtils, ...rest}
}

export default createReduxUtils
