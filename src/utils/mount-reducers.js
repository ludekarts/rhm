import {isObject} from "./helpers"
// Helps with destructureing the RHM reducers containings storeHooks.

const mountReducers = (...reducers) =>
  reducers.reduce((acc, reducer, index) => {
    if (!isObject(reducer) || !reducer.storeHook)
      throw new Error(`One of the mounting reducers [index:${index}] is not a proper RHM reducer.`)
    return {...acc, ...reducer.storeHook}
  }, {})

export default mountReducers
