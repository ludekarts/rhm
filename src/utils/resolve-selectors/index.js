// Applies composing function to all selectors with given namespace.

const resolveSelectors = (utils, namespace) => {
  if (utils.selectors) {
    const selectors = utils.selectors;
    Object.keys(selectors).forEach(key => {
      selectors[key] = composeSelector(selectors[key], (state, props) => state[namespace])
    });
  }

  else {
    Object.keys(utils).forEach(name => {
      const selectors = utils[name].selectors;
      if (selectors) {
        Object.keys(selectors).forEach(key => {
          selectors[key] = composeSelector(selectors[key], (state, props) => state[namespace])
        });
      }
    });
  }

  return utils;
}


export default resolveSelectors;


// ---- Helpers ----------------

// Composes selectors into one function call.
function composeSelector(selector, slicer) {
  return (state, props) => selector(slicer(state, props), props);
}
