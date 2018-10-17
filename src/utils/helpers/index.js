
// Check for primitie types & array.
export const isPrimitive = object => !object
  || typeof object === "symbol"
  || typeof object === "string"
  || typeof object === "number"
  || typeof object === "boolean"
  || Array.isArray(object)

// Check if value is an Object.
export const isObject = value => !isPrimitive(value) && typeof value !== "function"

// Verify if action need to be skipped.
export const isBypass = args => args[0] && typeof args[0] === "string" && args[0] === "RHM%BYPASS"

// Dumb check, but it works for most cases.
export const isPromise = fn => fn && typeof fn.then === "function"

// Merge InitialState Objects.
export const mergeStateObjects = args =>
  args.reduce((acc, arg, index) => {
    if (!isObject(arg))
      throw new Error(`Cannot merge initial states that are not Objects. Check initsial state at index: ${index}`)
    return {...acc, ...arg}
  }, {})

// Generate UID.
export const uid = () => "RHM." + ((+new Date) + Math.random()* 100).toString(32)

// Bind identityty selectors to reselect's "createSelector".
export const bindIdentitySelectors = dict => createSelector =>
  Object.keys(dict).reduce((acc, key) => {
    acc[key] = createSelector(dict[key], value => value)
    return acc
  }, {})
