# Redux Helpers Middleware (RHM)
This package contains several utility functions to :
- Deals with synchronous and asynchronous actions in Redux.
- Maintain Redux components.
- Create multiple instances of the same Redux component.
- Test async actions with regular Redux store.

## Helper methods

### rhm
The middleware that supports handling sync and async actions and helps deal with optimistic updates *(see Async actions)*.

### createAction("ACTION_TYPE", payload)
Helpers that allows to setup an action creator with given type and payload. Payload is passed as second argument and it can be **value** or **function** that returns a **Promise**. In that case action will be async.

#### Async actions

 When the action's payload is a Promise then this action is intercepted by the `rhm`. Intercepted action is then populated with new payload containing action-creator's arguments (those can be used to calculate optimistic update). After promise is resolved `ACTION_NAME_COMPLETE` action is dispatched. This time the payload contains an actual resolved value that can be used to update redux state. In case that an error occures the `ACTION_NAME_ERROR` action is dispatched with error message as a payload.

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

### createReducer({ACTION_TYPE: reductor, ...})(initialState, ...)
> Reductor signature: (payload, state, args) => ({key: value})

HOF that at first call gets objects containing reducers logic. At second call it need to be called with initial state, or several parts of this state passed as following arguments. This is convenient when you want to decompose your reducing logic into separate files along with relevant part of the state.

Reductios can have four diferent form.

```
const reducerLogicA = {
  ACTION_TYPE_A: (payload, state, args) => ({key: value}),
  ACTION_TYPE_B: (payload, state, args) => value,
  ACTION_TYPE_C: {key: value},
  ACTION_TYPE_D: value
}

const reducerLogicB = {
  ...
}

default export createReducer(reducersLogicA, reducersLogicB)(initialStateA, initialStateB)
```

**Note**

All of the objects returned from the reducer function will be flat merge into new state. So instead doing `{...state, myValue: 12}` just return a slice of the state you'd like to update e.g.: `{myValue: 12}`.

### createReduxUtils({reducer, actions, consts, combine}, namespace)
> Returns: {storeHook, actions, selectors, consts, ...}

Provides mounting point for rootReducer (*const.STORE_ROOT*) and allows to annotate *reducer* and *actions* of the component with **custom namespaces** in case developer want to duplicate or extend reducers functionality with other components.

#### Selectros note:

It is redomended to put **selectors** in the same file with **reducers** and export them as **selectors** object: `export {selectors}`. Then *createReduxUtils* will make sure that the **state object** passed to the selector will be a slice of the global state object related directly to the current reducer. It will also works with `reselect` library.


**Example of annotated selecctors**
```
  const initState = {
    value: 0
  }

  const selectors = {}
  selectors.getValue = state => state.value

  export {selectors}
```

#### Combining Mounting Points note:
There are cases when it'd be more convenient to distribute reducing logic for different part of the app into separate reucers e.g: ui-reducer, crud-reducer, fetch-reducer, etc. Most of them would have different mounting points (namespace in the store). To make them easy to mantain, sparate concerns and enable custom namespacing rhm allows for combining mounting points in by passing `combine:[reduxUtilsA, reduxUtilsB, ...]` in configuration object of **createReduxUtils()**. This also helps to aggregate several different reducers under one component's domain.

### mountReducers(reduxUtilsA, reduxUtilsB, ...)
> Returns: { nameA: reducerA, nameB: reducerB, ...}

Helps to mount RHM's reducers into rootReducer.

### testAsyncActions(): {sniffer, listener}
...


## To do
  1. Imporve Docs
  2. Add examples
  3. Add unit tests
