# Redux Helpers Middleware (RHM)
This package contains several utility functions to :
- help deal with synchronous and asynchronous actions in Redux ,
- maintain Redux components,
- create multiple instances of the same Redux component,
- test async actions with regular Redux store.

## Helper methods

#### redux-helpers-middleware
...

#### createAction("ACTION_TYPE", [payload, () => Promise])
...

#### createReducer("ACTION_TYPE", (payload, state, args) => ({key: value}) ,...)
...

#### createReduxUtils(reducer, actions, consts, hash): {storeHook, actions, selectors, consts}
...

#### testAsyncActions(): {sniffer, listener}
...
