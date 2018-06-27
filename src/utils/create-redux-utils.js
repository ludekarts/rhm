import {uid, isObject} from "./helpers"
import createAction from "./create-action"
import createReducer from "./create-reducer"
import combineMountingPoints from "./combine-mounting-points"


// Create Redux Utilities.
// createReduxUtils({reducer, actions, consts, ...}, namespace) => ({storeHook, actions, selectors, consts, ...})
//
// Provides mounting point for rootReducer (const.STORE_ROOT) and allows to annotate "reducer", "actions"
// and "selectors" of component with custom namespace in case developer want to duplicate functionality in a cheap way.
//
// NOTE: When You're creating your Selectros you can wrap them in a function: root => ({selcetors})
//       to supply them with dynamic "STORE_ROOT" key.


// Annotate actions with custom namespace.
const annotateActions = (actions, namespace) =>
  Object.keys(actions).reduce((acc, name) => {
    const action = actions[name]("RHM%BYPASS")
    acc[name] = createAction(`${action.type}_${namespace}`, action.payload)
    return acc
  }, {})


// Annotate reducer's actions with custom namespace.
const annotateReducer = (reducer, namespace) => {
  const findAsync = /(_COMPLETE|_ERROR)$/m
  const [reducerArgs, initialState] = reducer(null, null, true)
  const annotatedReducer = reducerArgs.map(caseObject =>
    Object.keys(caseObject).reduce((acc, action_type) => {
      const annotatedActionType = findAsync.test(action_type)
        ? action_type.replace(findAsync, match => `_${namespace}${match}`)
        : `${action_type}_${namespace}`
      acc[annotatedActionType] = caseObject[action_type]
      return acc
    }, {})
  )

  return createReducer(...annotatedReducer).apply(null, initialState)
}


// ---- Redux Utilities ----------------

const createReduxUtils = (utilities, namespace) => {

  if (!isObject(utilities))
    throw new Error("Incorrect argument. Method \"createReduxUtils()\" requires Object as an argument")

  if (!utilities.reducer)
    if (!utilities.combine)
      throw new Error("No \"reducer\" or \"combine\" property in \"createReduxUtils()\"")
    else  {
      let {combine, ...rest} = utilities
      return {storeHook: combineMountingPoints(combine), ...rest}
    }

  let {consts, actions, reducer: {default: reducer}, combine, ...rest} = utilities
  let storeRoot = namespace ? namespace : utilities.consts ? utilities.consts.STORE_ROOT : undefined

  // Create random "storeRoot" to avoid names colision.
  if (!storeRoot && reducer) {
    storeRoot = uid()
    console.warn(`There is no STORE_ROOT constant or "root" utility name to supply "storeHook". Instead UID: "${storeRoot}" was generated.`)
  }

  // Annotate Action_Types and Reducers with given namespace.
  if (namespace) {
    actions = annotateActions(actions, storeRoot)
    reducer = annotateReducer(reducer, storeRoot)
  }

  // Set storeHook fro rootReducer.
  const storeHook = reducer ? {[storeRoot]: reducer} : {}

  // Annotate & Merge all Selectors.
  let selectors = utilities.selectors
    ? typeof utilities.selectors === "function"
      ? utilities.selectors(storeRoot)
      : utilities.selectors
    : undefined

  const reducerSelectors = typeof utilities.reducer.selectors === "function"
    ? utilities.reducer.selectors(storeRoot)
    : utilities.reducer.selectors

  selectors = selectors ? {...selectors, ...reducerSelectors} : reducerSelectors

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
