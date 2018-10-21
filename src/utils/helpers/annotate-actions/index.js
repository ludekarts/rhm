import createAction from "../../create-action"

// Annotate actions with custom namespace.
const annotateActions = (actions, namespace) =>
  Object.keys(actions).reduce((acc, name) => {
    const action = actions[name]("RHM%BYPASS")
    acc[name] = createAction(`${action.type}_${namespace}`, action.payload)
    return acc
  }, {})

export default annotateActions
