import {isObject} from "./helpers"

// Helps with batching multiple "storeHooks" into one object which can be used in "rootReducer".
const combineHooks = (...utils) =>
  utils.reduce((acc, util) => {
    if (!isObject(util))
      throw new Error(`Only objects can be used in "combineHooks()" method, instead got "${Array.isArray(util) ? "array" : typeof util}"`)
    else if (util.storeHook)
      acc.combinedHooks = {...acc.combinedHooks, ...util.storeHook}
    else
      acc = {...acc, ...util}
    return acc
  }, {combinedHooks:{}})


export default combineHooks
