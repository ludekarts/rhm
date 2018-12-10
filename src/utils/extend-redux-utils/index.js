import mountSelectors from "../mount-selectors";
import annotateActions from "../annotate-actions";
import annotateReducer from "../annotate-reducer";

const extendReduxUtils = (namespace, source, postfix, extension) => {

  let {reducer, actions, selectors, storeHook, ...rest} = source;
  let srcSelectors = reducer.selectors;

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
