import {isObject} from "../helpers"
import mountSelectors from "../helpers/mount-selectors"
import combineMountingPoints from "../combine-mounting-points"

const mergeUtils = utilities =>
  utilities.reduce((acc, entry, index) => {
    const {storeHook, ...utils} = entry
    acc.hooks = {...acc.hooks, ...storeHook}

    if (utils.reducer)
      // Create namespace.
      acc.mergedUtils[Object.keys(storeHook)[0]] = utils
    else
      // Copy namespaces over.
      acc.mergedUtils = {...utils}
      
    return acc
  }, {
    hooks: {}, mergedUtils: {}
  })

const combineReducers = reducers =>
  (state = {}, action) =>
    Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action)
        return nextState
      }, {}
    )

const composeSelector = (selector, slicer) => (state, props) => selector(slicer(state, props), props)

const resolveSelectors = (utils, namespace) => {
  Object.keys(utils).forEach(name => {
    const selectors = utils[name].selectors
    Object.keys(selectors).forEach(key => {
      selectors[key] = composeSelector(selectors[key], (state, props) => state[namespace])
    })
  })
  return utils
}


const mergeReduxUtils = (namespace, ...utilities) => {

  // Flat merge.
  if (isObject(namespace) && namespace.storeHook) {
    utilities.push(namespace)
    const merge = mergeUtils(utilities)
    return {storeHook: merge.hooks, ...merge.mergedUtils}
  }

  // Merge under the namespace
  else if (typeof namespace === "string" && utilities.length) {
    const merge = mergeUtils(utilities)
    const response = {
      storeHook: {[namespace]: combineReducers(merge.hooks)},
      ...resolveSelectors(merge.mergedUtils, namespace)
    }
    return response
  }
}

export default mergeReduxUtils
