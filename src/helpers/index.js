// Check for primitie types & array.
export const isPrimitive = object => !object
  || typeof object === "symbol"
  || typeof object === "string"
  || typeof object === "number"
  || typeof object === "boolean"
  || Array.isArray(object);

// Check if value is an Object.
export const isObject = value => !isPrimitive(value) && typeof value !== "function";

// Verify if action need to be skipped.
export const isBypass = args => !!(args[0] && typeof args[0] === "string" && args[0] === "RHM%BYPASS");

// Dumb check, but it works for most cases.
export const isPromise = fn => fn && typeof fn.then === "function";

// Generate UID.
export const uid = () => "RHM." + ((+new Date) + Math.random()* 100).toString(32);
