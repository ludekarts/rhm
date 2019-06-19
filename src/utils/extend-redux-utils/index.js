import mountSelectors from "../mount-selectors";
import annotateActions from "../annotate-actions";
import annotateReducer from "../annotate-reducer";

// Allows to extend functionality of an existing redux utilities or create a new one
// based on one we want to extend by adding "extensionPostfix" params !== "" e.g "myExtension".
//
// USAGE:
/*

  const extension = extendReduxUtils("extensionName", utilsToExtend, "extensionPostfix", {
    initState: {},

    reducer: {
      EXT_ACTION_NAME: (payload , state, args) => ({})
    },

    actions: {
      extActionName: createAction("EXT_ACTION_NAME")
    },

    selectors: {}
  });

*/
const extendReduxUtils = (namespace, source, postfix, extension) => {

  // TODO: Add "source" validation.
  let {reducer, actions, selectors, storeHook, ...rest} = source;

  // TODO: Add "selectors" validation.
  let srcSelectors = reducer.selectors;

  // TODO: Add "extension" validation.
  const {
    actions: extActions,
    reducer: extReducer,
    selectors: extSelectors,
    storeHook: extStoreHook,
    initState,
    ...extRest
  } = extension;

  reducer = reducer.default ? reducer.default : reducer;

  actions = annotateActions(actions, postfix, extActions);
  reducer = annotateReducer(reducer, postfix, extReducer, initState);

  const extUtilities = {
    actions,
    reducer,
    storeHook: {[namespace]: reducer},
    selectors: mountSelectors({...srcSelectors, ...extSelectors}, namespace),
    ...rest,
    ...extRest
  };

  return extUtilities;
}

export default extendReduxUtils;
