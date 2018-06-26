import {isPromise} from "./helpers"

// Redux Helpers Middleware.
// Allows to handle asyn actions, and deal with optimistic updates.
// NOTE: When action payload is a Promise then this action is intercepted and is dispatched with
//       payload containing action-creator's arguments (those can be used to calculate optimistic update),
//       after promise is resolved "ACTION_NAME_COMPLETE" action is dispatched.
//       This time the payload contains an actual resolved value that can be used to update redux state.
//       When an error occures the "ACTION_NAME_ERROR" action is dispatched with error message as a payload.
//
// EXAMPLE HOW THE ACTIONS DISPATCH:
// User: const asyncAction = createAction("ASYNC_ACTION", id => call.api(id))
//        ↓
// User: asyncAction(12)
//        ↓
// RHM:  dispatch({type: "ASYNC_ACTION", payload: [12]})
//        ↓
// RHM:  Promise is resolved...
//        ↓
// RHM:  dispatch({type: "ASYNC_ACTION_COMPLETE", payload: promiseResult, args:[12]})
//
export default ({dispatch, getState}) => next => action => {
  if (isPromise(action.payload)){
    dispatch({type: action.type, payload: action.args})
    return action.payload
      .then(payload => dispatch({type: action.type + "_COMPLETE", payload, args: action.args}))
      .catch(payload => dispatch({type: action.type + "_ERROR", payload, error: true, args: action.args}))
  }
  else if (typeof action === "function")
    return action(dispatch, getState)
  else
    return next(action)
}
