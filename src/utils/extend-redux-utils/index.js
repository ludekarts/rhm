import mountSelectors from "../helpers/mount-selectors"

const extendReduxUtils = (extension, namespace) => {
  const {reducer, selectors, actions, consts, ...rest} = extension


  const filanUtils = {
    selectors: selectors ? mountSelectors(selectors, namespace) : {}
  }

  return filanUtils
}

export default extendReduxUtils
