import {isObject} from "./helpers"

// Combine components utilities in one big utility object.
const combineUtilities = (...utils) =>
  utils.reduce((acc, util) => {
    if (!isObject(reducer) || !reducer.storeHook)
      throw new Error(`One of the combined utilities (index:${index}) is not an object or have no "storeHook" property.`)

    acc.storeHook = {...acc.storeHook, ...util.storeHook}

    util.selectors && (acc.selectors = {...acc.selectors, ...util.selectors})
    util.actions && (acc.actions =  {...acc.actions, ...util.actions})
    util.consts && (acc.consts = {...acc.consts, ...util.consts})

    return acc
  }, {
    storeHook: {}, selectors: {}, actions: {}, consts: {}
  })

export default combineUtilities
