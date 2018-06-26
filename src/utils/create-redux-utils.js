import {uid, isObject} from "./helpers"
import createAction from "./create-action"
import createReducer from "./create-reducer"


// Create Redux Utilities.
//
// createReduxUtils({reducer, actions, consts, namespace, ...}): {storeHook, actions, selectors, consts, ...}
//
// NOTE: When You're creating your Selectros you can wrap them in a function: root => ({selcetors})
//       to supply them with dynamic "STORE_ROOT" key.



// ---- Redux Utilities ----------------

// Annotate actions with custom hash.
const annotateActions = (actions, annotation) =>
  Object.keys(actions).reduce((acc, name) => {
    const action = actions[name]("RHM%BYPASS")
    acc[name] = createAction(`${action.type}_${annotation}`, action.payload)
    return acc
  }, {})


// Annotate reducer's actions with custom hash.
const annotateReducer = (reducer, annotation) => {
  const findAsync = /(_COMPLETE|_ERROR)$/m
  const [reducerArgs, initialState] = reducer(null, null, true)
  const annotatedReducer = reducerArgs.map(caseObject =>
    Object.keys(caseObject).reduce((acc, action_type) => {
      const annotatedActionType = findAsync.test(action_type)
        ? action_type.replace(findAsync, match => `_${annotation}${match}`)
        : `${action_type}_${annotation}`
      acc[annotatedActionType] = caseObject[action_type]
      return acc
    }, {})
  )

  return createReducer(...annotatedReducer).apply(null, initialState)
}


const createReduxUtils = utilities => {

  if (!isObject(utilities))
    throw new Error("Incorrect argument. Method \"combineUtilities()\" requires Object as an argument")

  if (!utilities.reducer)
    throw new Error("No reducer in \"combineUtilities()\"")

  let {consts, actions, reducer: {default: reducer}, ...rest} = utilities
  let storeRoot = utilities.namespace ? utilities.namespace : utilities.consts ? utilities.consts.STORE_ROOT : undefined

  // Create random "storeRoot" to avoid names colision.
  if (!storeRoot && reducer) {
    storeRoot = uid()
    console.warn(`There is no STORE_ROOT constant or "root" utility name to supply "storeHook". Instead UID: "${storeRoot}" was generated.`)
  }

  // Annotate Action_Types and Reducers with given namespace.
  if (utilities.namespace) {
    actions = annotateActions(actions, storeRoot)
    reducer = annotateReducer(reducer, storeRoot)
  }

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

  // Set storeHook fro rootReducer.
  const storeHook = reducer ? {[storeRoot]: reducer} : {}

  // Explicite create utilities that exist.
  const annotatedUtils = {storeHook}
  if (consts) annotatedUtils.consts = consts
  if (actions) annotatedUtils.actions = actions
  if (selectors) annotatedUtils.selectors = selectors

  return {...annotatedUtils, ...rest}
}

export default createReduxUtils


/*


// Annotate actions with custom hash.
const annotateActions = (actions, storeRoot) =>
  Object.keys(actions).reduce((acc, name) => {
    const action = actions[name]("RHM%BYPASS")
    acc[name] = createAction(`${action.type}_${storeRoot}`, action.payload)
    return acc
  }, {})


// Annotate reducer's actions with custom hash.
const annotateReducer = (reducer, storeRoot) => {
  const [reducerArgs, initialState] = reducer(null, null, true)
  const annotatedReducer = reducerArgs.map((arg, index) =>
    index % 2 === 0
      ? /(_COMPLETE|_ERROR)$/m.test(arg)
        ? arg.replace(/(_COMPLETE|_ERROR)$/m, match => `_${storeRoot}${match}`)
        : `${arg}_${storeRoot}`
      : arg
  )
  return createReducer(...annotatedReducer)(initialState)
}


const createReduxUtils = (fromReducer, fromActions, consts, hash) => {
  let storeRoot = typeof consts === "string" ? consts : hash ? hash : consts ? consts.STORE_ROOT : undefined
  let actions = fromActions
  let reducer = fromReducer.default

  // Create random "storeRoot" to not crash.
  if (!storeRoot && reducer) {
    storeRoot = uid()
    console.warn("There is no STORE_ROOT constant to generate 'storeHook'. UID was generated: " + storeRoot)
  }

  // Annotate action types and reducer's functions with given hash.
  if (hash) {
    actions = annotateActions(actions, storeRoot)
    reducer = annotateReducer(reducer, storeRoot)
  }

  const selectors = typeof fromReducer.selectors === "function"
    ? fromReducer.selectors(storeRoot)
    : fromReducer.selectors

  const combinedHooks = fromReducer.combinedHooks || {}

  // Allow to skip default reduces (usefull when agregating sub-reducers).
  const defStoreHook = reducer ? {[storeRoot]: reducer} : {}

  // Expose current storeHook & Combine other hooks if exist.
  const storeHook = {...defStoreHook, ...combinedHooks}

  // Explicite create utilities that exist.
  const utilities = {storeHook};
  if (consts) utilities.consts = consts
  if (actions) utilities.actions = actions
  if (selectors) utilities.selectors = selectors

  return utilities
}

export default createReduxUtils
*/
