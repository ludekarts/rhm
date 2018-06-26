import {isBypass, isAction} from "./helpers"

// Create Action Helper.
const createAction = (type, body) => {
  if (!isAction(type)) throw new Error("Action type name does not match common pattern: [A-Z_-]+")
  return (...args) => {
    const payload = isBypass(args) ? body : typeof body === "function" ? body(...args) : body
    return {type, args, payload}
  }
}

export default createAction
