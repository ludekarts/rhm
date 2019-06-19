# Redux Helpers & Middleware (RHM)
This package contains several utilities for:
- Dealing with synchronous and asynchronous actions in Redux.
- Maintaining Redux components.
- Exntending Redux components (base on [RHM's Component Pattern](#)).
- Building Redux Store structure in more compossible fashion (bottom-up).
- Test async actions with regular Redux store.

# 🌮 Middleware
This middleware supports sync/async actions and help deals with optimistic updates (see more in Async Actions section).

**USAGE:**
Import it as a default from **rhm** package and add into your middlewares.

```
import rhm from "rhm";
import {applyMiddleware, createStore} from "redux";
...

const store = createStore(reducer, applyMiddleware(rhm));
```


# 📦  Helpers
Helpers is a collection of couple utility functions that can do multiple things from ctreateing Redux actions to merge and extends other redux-utilities.


## createAction

Sets up an action creator with given type and payload. Payload is passed as a second argument and it can be any **value** or **function** that evaluates to a value. If function returns a **Promise** then this action is automaticy treatted as an async action.

**USAGE:**
```
import {createAction} from "rhm";
...

const actionName = createAction("ACTION_TYPE", payload);
```

**PARAMS:**
| Param | Type | Required | Description |
|:---:|:---:|:---:|---|
| **ACTION_TYPE**  | String  | True | Describe action name. |
| **payload**  | Any | True | The payload of the dispatched action. |
| ↳ | Function -> Any | . | Functions will be eveluated into a value. |
| ↳ | Function -> Promise | . | Functions resolved into promisses will be async by default. |

## createReducer

Higher order function that creates a reducer function that can be called later with its initial state.

**USAGE (basic):**
```
import {createReducer} from "rhm";
...

const initialState = {};
const reducerLogic = {
  ACTION_TYPE: ({payload, store, args}) => ({}),
  ...
};
const reducer = createReducer(reducerLogic)(initialState);
```

**PARAMS:**
| Param | Type | Required | Description |
|:---:|:---:|:---:|---|
| **reducerLogic**  | Object  | True | Contains reducing loginc as a **key: value** pairs wher **key is an action name** and the value is the reducer's outcome. |
| **initialState**  | Object | True | Inintila state for the reducer. |


**Reducer's Outcome:**
Single reducing statemanet in **reducerLogic** object can be written in one of four forms:

```
const reducerLogic = {
  ACTION_TYPE_A: ({payload, store, args}) => ({key: value}),
  ACTION_TYPE_B: ({payload, store, args}) => value,
  ACTION_TYPE_C: {key: value},
  ACTION_TYPE_D: value
};
```

When reducing statement is function then as an argument it will receive the object with following properties:

| Prop | Type | Description |
|:---:|:---:|---|
| **payload**  | Object  | Dispatched action's payload. |
| **store**  | Object  | Current store reference. |
| **args**  | Array  | Array of arguments that were called on the action creator. |

**USAGE (advanced):**
Sometimes it's convenient to separate parts of the reducer with corresponding state into separate files. In that case you can compose it like this:

```
import {createReducer} from "rhm";
import reducerLogicA, {initialStateA} from "./fileA";
import reducerLogicB, {initialStateB} from "./fileB";
...

default export createReducer(
    reducerLogicA,
    reducerLogicB
)(
    initialStateA,
    initialStateB
);
```

### Selectors
Selectors are used to get / compute derived data from the store and in most cases we want them to be colocated with the reducer of this component. Selectors need to operate on the globals store object which make it hard to keep components independent, decoupled from the global data structure. Using RHM's helpers we can use selectors as they were locally scoped. In your reducer just create named **selectors** export and treat **initial state** object as the root of your component data structure.

**Note:**
It also can be used with libary as [reselect](https://github.com/reduxjs/reselect).

```
import {createSelector} from "reselect";
...

const selectors = {
  getItemPrice: state => state.itemPrice,
  getAmount: state => state.amount
};

selectors.totalPrice = createSelector(
  selectors.getItemPrice,
  selectors.getAmount,
  (itemPrice, amount) =>  itemPrice * amount
);

export {selectors};
```

## mountReducers

Installs all RHM's reducers in your root reducer. The convenience of this approach is that now you can import only the top level components of your app and don't need to worry how to map app structure in the Redux Store. Using RHM's helpers you can build store structure in more elastic way.

```
// rootReducer.js
import {mountReducers} from "rhm";
import {combineReducers} from "redux";
import {myReduxComponent} from "components/myReduxComponent";
...

export default combineReducers(mountReducers(myReduxComponent));
```


## createReduxUtils

Creates **redux-utility** object for the component. This allows us to have a single point of reference for actions, selectors, constants etc. It aggregates redux's capabilities in clean unified API. For more details see: [RHM's Component Pattern](#)

**USAGE:**
```
import * as actions from "./redux/actions";
import * as reducer from "./redux/reducer";
import * as anythingElse from "./myReduxComponent/utils";

const myReduxComponent = createReduxUtils("myReduxComponent", {reducer, actions, anythingElse});
```

Now the **myReduxComponent** object will contain following properties:

```
console.log(myReduxComponent) //
{
  reducer: () => {},
  actions: {},
  selectors: {},
  storeRoot: "myReduxComponent",
  ...anythingElse  
}
```

**PARAMS:**
| Param | Type | Required | Description |
|:---|:---:|:---:|---|
| **storeRoot**  | String | True | Name under which the reducer will be registered in the Redux Store. |
|**utilitiesConfig** | Object | True | Redux-utility configuration object that specivies its main **reducer**, **actions** and **selectors**. |

**Redux-utility configuration object schema:**
| Prop | Type | Required | Description |
|:---|:---:|:---:|---|
| **reducer** | Function | True | Reducer function. In most cases it will be the product of **createReducer** helper. |
| **actions** | Object | True | A collection of all actions related to this component. |
| **selectors** | Object | True | A collection of selector functions for current piece of store. |

**Note:**
You can pass into **createReduxUtils** configuration's object anything that you may find usefull for your component. Those values will be passed thorugh. CreateReduxUtils requires only **reducer**, **actions** and **selectors** therefore it have some restrictions about it. The rest is up to you.

**Note 2:**
Selectors can be provided in two ways. One directly as "selectors" prop in the configuration object or two as a part of component's reducer export which is preferred an used in [HRM's Component Pattern](#).

## extendReduxUtils

Extends **Redux-utility** object. This mean that you can add **new actions**, **reducers**, **selectors** and **initial state** to the existing components extending their functionalities or creating new instances with similar logic by provideing **extensionPostfix**.

**Note:**
Extended components are separate instances in terms of data. They're altered copies of their "parents" an also exist in Redux Store under its own namespace.

```
  import {extendReduxUtils, createAction} from "rhm";
  import utilsToExtend from "./componentToExtend";

  const extension = extendReduxUtils(
    "extensionName",
    utilsToExtend,
    "extensionPostfix",
    {
        initState: {},
        reducer: {
          EXT_ACTION_NAME: (payload , state, args) => ({})
        },
        actions: {
          extActionName: createAction("EXT_ACTION_NAME")
        },
        selectors: {}
  });
```

**PARAMS:**
| Param | Type | Required | Description |
|:---|:---:|:---:|---|
| **extensionName** | String | True | Name under which the reducer will be registered in the Redux Store. |
| **utilsToExtend** | Redux-utility Object | True | Valid Redux-utility Object that you wish to extend / override. |
| **extensionObject** | String | True | Configuration of new/added Redux-utility Object. |
| **extensionPostfix** | String | False | If specified then the new entity will be created. Otherwise basic object properties override rules applies. |

## mergeReduxUtils

Allows to deep/flat merge of redux-utilities objects to allow creating store structure in more composible fashion. In other words it merges given utilities under **one namespace** or **flat merge** it if no namespace provided. Merge will respect all relations between reducres and it's slectors.

**USAGE:**
```
import {utils_one} from "./components/utilsOne";
import {utils_two} from "./components/utilsTwo";
import {utils_three} from "./components/utilsThree";
...

// Merge under namespace:
export default mergeReduxUtils("mergedName", utils_one, utils_two, utils_three);

// Flat Merge:
export default mergeReduxUtils(utils_one, utils_two, utils_three);
```
**PARAMS:**
| Param | Type | Required | Description |
|:---|:---:|:---:|---|
| **mergedName** | String | False | Provides common namespace for merged utilities. This name will appear in the Redux Store. |
| **reduxUtilities** | Redux-utility Object | True | One or more Objects that will be merged together. |

**Named Merge vs. Flat Merge:**
When to use Named merge instead of Flat merge?
- Use **Named merge** when you separate logic in terms of one component and you want that component have common state with its parts and appear in Redux Store under one name. Example of that could be some kind of editing UI where you'd have: WorkingAreaComponent, ToolbarComponent, UIComponent where each of them have its own internal state but as a whole they create *editorComponent* and share some common state as well.
- Use **Flat Merge** if you have couple components scattered in many location but you would like to import it in one import into your *rootReducer*. Example of that could be set of user-tool components where none of them share common state but physically are located under one catalog e.g.: *user-tools*.


## createCompactUtils
Provides same functionality as **createReduxUtils** but allows developer to use compact notation that can be putted in single file instead spreading the logic across multiple files.

**USAGE:**
```
export default createCompactUtils("storeRoot", {

  initState: {},

  reducer: {
    ACTION_NAME: ({payload, state, args}) => ({})
  },

  actions: {
    actionName: ["ACTION_NAME", value / () => {} / undefined],
  },

  selectors: {}

});
```

| Param | Type | Required | Description |
|:---|:---:|:---:|---|
| **storeRoot**  | String | True | Name under which the reducer will be registered in the Redux Store. |
|**utilitiesConfig** | Object | True | Redux-utility configuration object that specivies its main **reducer**, **actions**, **selectors** and **initial state**. |

**Redux-utility configuration object schema:**
| Prop | Type | Required | Description |
|:---|:---:|:---:|---|
| **initState** | Object | True | Initial state for the reducer |
| **reducer** | Object | True | Reducer configuration object. Same as in **createReducer**. |
| **actions** | Object | True | A collection of all action creators related to this component. |
| **selectors** | Object | True | A collection of selector functions for current piece of store. |

**How to create actions in shorthand notation?:**
In the shorthand notation each action creator is a **key:value** pair where
- **key** is the **action crator name**
- **value** is a **tuple** (array) of an **action name** and **final value**/**function** or **undefined**.

## asyncStore

Enhance Redux Store with **addAsyncReducer** which can help in code splitting.

```
  import rhm, {asyncStore} from "rhm";
  import reducers from "./staticReducers";
  import {applyMiddleware, createStore, combineReducers} from "redux";
  ...

  const store = asyncStore(createStore(combineReducers(reducers), middleware), reducers);
```

Later on with **dynamic imports** using e.g.: [react-loadable](https://github.com/jamiebuilds/react-loadable):

```
import store from "./store";
import Loadable from "react-loadable";
import Loading from "./my-loading-component";
...

const AsyncComponent = Loadable({
  loader: () => import('./my-component').then(store.addAsyncReducer),
  loading: Loading,
});
```


## testAsyncActions

```
TO DO ...
```



# 🐾  RHM's Component Pattern
This guideline describes how to best structure components to get full advantage from the RHM package.

### File structure

# 🃏 Extras
Some additional information about RHM internals.

### Async Actions

When the action's payload is a Promise then this action is registered by the **rhm** and the `ACTION_NAME_PENDING` action is displatched. After the promise is resolved `ACTION_NAME_COMPLETE` action is dispatched. The action's payload contains resolved value that can be used to update Redux Store. In case an error occured the `ACTION_NAME_ERROR` action is dispatched with error message as a payload.

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
dispatch({type: "ASYNC_ACTION_PENDING", payload: Promise, args: [12]})
        ↓
Promise is resolved...
        ↓
// RHM dispatches _COMPLETE action with resolved value as payload and "id" as element of args array.
dispatch({type: "ASYNC_ACTION_COMPLETE", payload: PromiseResult, args:[12]})
```
