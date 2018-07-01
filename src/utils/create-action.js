import {isBypass} from "./helpers"

// Create Action Helper.
const createAction = (type, body) => (...args) => {
  const payload = isBypass(args) ? body : typeof body === "function" ? body(...args) : body
  return {type, args, payload}
}


export default createAction
