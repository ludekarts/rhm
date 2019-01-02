import createReducer from "../create-reducer";

// Annotate reducer's actions with custom namespace.
const annotateReducer = (reducer, namespace, extReducer, extState) => {
  const findAsync = /(_COMPLETE|_ERROR)$/m;
  let [reducerArgs, initialState] = reducer(null, null, true);

  // Additional underscore in name.
  namespace.length && (namespace = "_" + namespace);

  // Extend.
  extReducer && reducerArgs.push(extReducer);
  extState && initialState.push(extState);

  // Annotate.
  const annotatedReducer = reducerArgs.map(caseObject =>
    Object.keys(caseObject).reduce((acc, action_type) => {
      const annotatedActionType = findAsync.test(action_type)
        ? action_type.replace(findAsync, match => `${namespace}${match}`)
        : `${action_type}${namespace}`;
      acc[annotatedActionType] = caseObject[action_type];
      return acc;
    }, {})
  );

  return createReducer(...annotatedReducer).apply(null, initialState);
}


export default annotateReducer;
