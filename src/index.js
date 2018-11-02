// Redux Helpers Middleware.
// by Wojciech Ludwin 2018, ludekarts@gmail.com
// License: MIT.

import middleware from "./utils/middleware"
import createAction from "./utils/create-action"
import createReducer from "./utils/create-reducer"
import mountReducers from "./utils/mount-reducers"
import mergeReduxUtils from "./utils/merge-redux-utils"
import createReduxUtils from "./utils/create-redux-utils"
import extendReduxUtils from "./utils/extend-redux-utils"
import testAsyncActions from "./utils/test-async-actions"
import bindIdentitySelectors from "./utils/helpers/bind-identity-selectors"

export default middleware
export {
  createAction,
  createReducer,
  mountReducers,
  createReduxUtils,
  extendReduxUtils,
  mergeReduxUtils,
  testAsyncActions,
  bindIdentitySelectors
}
