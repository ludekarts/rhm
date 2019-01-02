# Redux Helpers Middleware (RHM)
This package contains several utility functions for:
- Dealing with synchronous and asynchronous actions in Redux.
- Maintaining Redux components.
- Exntending Redux components.
- Building Redux Store structure in more compossible fashion (bottom-up).
- Test async actions with regular Redux store.

# Middleware
Import as default from **rhm** package and add it into your middlewares.

```
import rhm from "rhm";
import {applyMiddleware, createStore} from "redux";

...

const store = createStore(reducer, applyMiddleware(rhm));
```

This middleware supports sync/async actions and helps deal with optimistic updates (see Async actions).


# Helpers
Helpers can do multiple things from ctreateing Redux actions to merge and extends other redux-utilities.


## createAction

This function will help you to set up an action creator with given type and payload. Payload is passed as second argument and it can be any **value** or **function** that evaluates to a valied value. If function returns a **Promise** then this action will be treatted as an async action.

```
const actionName = createAction("ACTION_TYPE", payload);
```

### Async actions

When the action's payload is a Promise then this action is registered by the **rhm** and after promise is resolved `ACTION_NAME_COMPLETE` action is dispatched. The action's payload contains resolved value that can be used to update redux state. In case that an error occures the `ACTION_NAME_ERROR` action is dispatched with error message as a payload.

**Wildcard error handling**

You can provide a *Wildcard Error reducer* which looks like this: `*_ERROR`. It'll catch all async errors that are not specified in any of your reducers.  

**Example action flow**
```
// Create async action creator.
const asyncAction = createAction("ASYNC_ACTION", id => call.api(id))
        ↓
// Dispatch async action.        
dispatch(asyncAction(12))
        ↓
// RHM dispatches synchronous action with "id" as payload.
dispatch({type: "ASYNC_ACTION", payload: [12]})
        ↓
Promise is resolved...
        ↓
// RHM dispatches _COMPLETE action with resolved value as payload and "id" as element of args array.
dispatch({type: "ASYNC_ACTION_COMPLETE", payload: promiseResult, args:[12]})
```


## createReducer

Higher order function that at first call gets objects containing reducer's logic. At second call it need to be called with the initial state, or several parts of this state passed as following arguments. This is convenient when you want to decompose your reducing logic into separate files along with relevant part of the state.

```
const reducer = createReducer({

  ACTION_TYPE: (payload, store, args) => ({}),

  ...

}, ...)(initialStateA, ...);
```

Reducer can return one of four types:

```
const reducerLogic = {
  ACTION_TYPE_A: (payload, store, args) => ({key: value}),
  ACTION_TYPE_B: (payload, store, args) => value,
  ACTION_TYPE_C: {key: value},
  ACTION_TYPE_D: value
};
```

### Decomposign reducer's logic

Sometimes it is convenient to separate parts of reducer with the corresponding state into separate file. Then you can compose it back like this:

```

import reducerLogicA, {initialStateA} from "./fileA";
import reducerLogicB, {initialStateB} from "./fileB";

default export createReducer(reducerLogicA, reducerLogicB)(initialStateA, initialStateB);

```


## mountReducers

This helper will handle all details about proper installing all RHM's reducers into your root reducer. This is very convenient because now you can import only the top level components of your app and don't worry how to map app structure in the Store. Using RHM's helpers you can build the structure alongside the app with ease.

```
// rootReducer.js
...
import {mountReducers} from "rhm";
import {combineReducers} from "redux";
import {myReduxComp} from "components/myReduxComp";
...

export default combineReducers(mountReducers(myReduxComp));
```


## createReduxUtils

Creates the redux-utility object for the component. This allows us to hava a single point of reference for actions, selectors, constants etc. It aggregates redux capabilities in clean unified API.

```
import * as actions from "./redux/actions";
import * as reducer from "./redux/reducer";
import * as anythingElse from "./myReduxComp/utils";

const myReduxComp = createReduxUtils("myReduxComp", {reducer, actions, anythingElse});
```

This object will contain following properties:

```
console.log(myReduxComp) //
{
  reducer: () => {},
  actions: {},
  selectors: {},
  storeRoot: "myReduxComp",
  ...anythingElse  
}

```

You can pass into **createReduxUtils** configuration object anything that you may find usefull for your component. Those values will be passed thorugh. createReduxUtils cares only about reducer ,actions and selectors therefore it have some restrictions about it. Rest is up to you.

## extendReduxUtils

```
TO DO ...
```


## mergeReduxUtils

```
TO DO ...
```


## createCompactUtils

```
TO DO ...
```


## testAsyncActions

```
TO DO ...
```
