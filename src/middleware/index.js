import {isPromise} from "../helpers";

// Redux Helpers Middleware.

export default function rhm({dispatch, getState}) {
  return next => action => {

   if (isPromise(action.payload)){
     dispatch({type: action.type + "_PENDING", payload: action.payload, args: action.args});
     return action.payload
       .then(payload => dispatch({type: action.type + "_COMPLETE", payload, args: action.args}))
       .catch(payload => dispatch({type: action.type + "_ERROR", payload, error: true, args: action.args}));
   }

   else if (typeof action === "function") {
     return action(dispatch, getState);
   }

   else {
     return next(action);
   }
};
}
