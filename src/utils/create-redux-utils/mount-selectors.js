// Wrapp selectors with state slicing function.
const mountSelectors = (selectors, storeRoot) =>
  Object.keys(selectors).reduce((acc, name) => {
    acc[name] = (state, props) => selectors[name](state[storeRoot], props)
    return acc
  }, {})

export default mountSelectors
