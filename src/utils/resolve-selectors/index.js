
// Composes selectors into one function call.
const composeSelector = (selector, slicer) => (state, props) => selector(slicer(state, props), props)

// Applies composing function to all selectors with given namespace.
const resolveSelectors = (utils, namespace) => {
  Object.keys(utils).forEach(name => {
    const selectors = utils[name].selectors
    Object.keys(selectors).forEach(key => {
      selectors[key] = composeSelector(selectors[key], (state, props) => state[namespace])
    })
  })
  return utils
}

export default resolveSelectors
