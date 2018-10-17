import {isObject} from "../helpers"

// Combine mounting points of different components into one storeHook.
const combineMountingPoints = combine => {
  if (Array.isArray(combine))
    return combine.reduce((acc, util, index) => {
       if (!isObject(util) || !util.storeHook)
          throw new Error(`Cannot create mounting point from given arguments. Chcek args in createReduxUtils({..., combine:[...]}) at index: ${index}`)
        return {...acc, ...util.storeHook}
      }, {})
  else
    throw new Error(`Cannot combine mounting points. Combined utilities should be agregate in array`)
}

export default combineMountingPoints
