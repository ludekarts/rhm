import {isBypass} from "../../helpers";

// Create Action Helper.
const createAction = (type, body) => (...args) => {
  const action = {type};
  const payload = isBypass(args)
    ? body
    : typeof body === "function"
      ? body(...args)
      : body;

  if (payload) action.payload = payload;
  if (args.length && body) action.args = args;
  return action;
}

export default createAction;
