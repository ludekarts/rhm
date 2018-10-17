
const extendReduxUtils = (root, namespace, extension) => {
  const {reducer: extReducer, actions: extActions, storeRoot} = extension
  const {reducer, actions, selectors, ...rest} = root


}

export default extendReduxUtils
