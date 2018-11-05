import {isObject} from "../../helpers"
import mountSelectors from "../mount-selectors"
import mergeUtilities from "../merge-utilities"
import combineReducers from "../combine-reducers"
import resolveSelectors from "../resolve-selectors"

// Merges given utilities under one namespace OR flat merge if no namespace.
const mergeReduxUtils = (namespace, ...utilities) => {

  // Flat merge.
  if (isObject(namespace) && namespace.storeHook) {
    utilities.push(namespace)
    const merge = mergeUtilities(utilities)
    return {storeHook: merge.hooks, ...merge.mergedUtils}
  }

  // Merge under the namespace
  else if (typeof namespace === "string" && utilities.length) {
    const merge = mergeUtilities(utilities)
    const response = {
      storeHook: {[namespace]: combineReducers(merge.hooks)},
      ...resolveSelectors(merge.mergedUtils, namespace)
    }
    return response
  }
}

export default mergeReduxUtils
