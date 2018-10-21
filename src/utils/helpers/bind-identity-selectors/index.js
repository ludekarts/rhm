// Bind identityty selectors to reselect's "createSelector".
const bindIdentitySelectors = dict => createSelector =>
  Object.keys(dict).reduce((acc, key) => {
    acc[key] = createSelector(dict[key], value => value)
    return acc
  }, {})

export default bindIdentitySelectors
