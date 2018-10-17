import createReducer from "../create-reducer"

// Annotate reducer's actions with custom namespace.
const annotateReducer = (reducer, namespace) => {
  const findAsync = /(_COMPLETE|_ERROR)$/m
  const [reducerArgs, initialState] = reducer(null, null, true)
  const annotatedReducer = reducerArgs.map(caseObject =>
    Object.keys(caseObject).reduce((acc, action_type) => {
      const annotatedActionType = findAsync.test(action_type)
        ? action_type.replace(findAsync, match => `_${namespace}${match}`)
        : `${action_type}_${namespace}`
      acc[annotatedActionType] = caseObject[action_type]
      return acc
    }, {})
  )

  return createReducer(...annotatedReducer).apply(null, initialState)
}


export default annotateReducer
