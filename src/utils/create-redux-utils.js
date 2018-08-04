import {uid, isObject} from "./helpers"
import createAction from "./create-action"
import createReducer from "./create-reducer"
import combineMountingPoints from "./combine-mounting-points"


// Create Redux Utilities.
// createReduxUtils({reducer, actions, consts, combinne, storeRoot, ...}, namespace) => ({storeHook, actions, selectors, consts, ...})
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

// Wrapp selectors with state slicing function.
const mountSelectors = (selectors, storeRoot) =>
  Object.keys(selectors).reduce((acc, name) => {
    acc[name] = (state, props) => selectors[name](state[storeRoot], props)
    return acc
  }, {})


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

  let {consts, actions, reducer: {default: reducer}, combine, storeRoot, ...rest} = utilities
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
