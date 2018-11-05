
// Megred RHM's utilities.
const mergeUtilities = utilities =>
  utilities.reduce((acc, entry, index) => {
    const {storeHook, ...utils} = entry
    acc.hooks = {...acc.hooks, ...storeHook}

    if (utils.reducer)
      // Create namespace.
      acc.mergedUtils[Object.keys(storeHook)[0]] = utils
    else
      // Copy namespaces over.
      acc.mergedUtils = {...utils}

    return acc
  }, {
    hooks: {}, mergedUtils: {}
  })


export default mergeUtilities
