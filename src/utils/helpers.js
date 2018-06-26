
// Check for primitie types & array.
export const isPrimitive = object => !object
  || typeof object === "symbol"
  || typeof object === "string"
  || typeof object === "number"
  || typeof object === "boolean"
  || Array.isArray(object)

// Check if value is an Object.
export const isObject = value => !isPrimitive(value) && typeof value !== "function"

// Verify ~ name convention.
export const isAction = (type) => typeof type === "string" && /^[0-9A-Z_-]+$/gm.test(type)

// Verify if action need to be skipped.
export const isBypass = args => args[0] && typeof args[0] === "string" && args[0] === "RHM%BYPASS"

// Dumb check, but it works for most cases.
export const isPromise = fn => fn && typeof fn.then === "function"

// Slice array in chunks with given size.
// export const chunk = (array, size) => {
//   let index = 0, arrayLength = array.length, chunks = []
//   for (index ; index < arrayLength; index += size) {
//     chunks.push(array.slice(index, index + size))
//   }
//   return chunks
// }

export const mergeStateObjects = args =>
  args.reduce((acc, arg) => {
    if (!isObject(arg))
      throw new Error(`Cannot merge initial states that are not Objects`)

    return {...acc, ...arg}
  }, {})

// Generate UID.
export const uid = () => "RHM." + ((+new Date) + Math.random()* 100).toString(32)
