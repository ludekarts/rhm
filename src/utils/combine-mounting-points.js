import {isObject} from "./helpers"

// Combine mounting points of different components into one storeHook.
const combineMountingPoints = combine => {
  if (Array.isArray(combine))
    return combine.reduce((acc, util) => {
       if (!isObject(util) || !util.storeHook)
          throw new Error(`Cannot create mounting point from given arguments`)
        return {...acc, ...util.storeHook}
      }, {})
  else
    throw new Error(`Cannot combine mounting points. Combined utilities should be agregate in array`)
}

export default combineMountingPoints
