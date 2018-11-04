import createAction from "../../create-action"

// Annotate actions with custom namespace.
const annotateActions = (actions, namespace, extActions) => {
  namespace.length && (namespace = "_" + namespace)
  extActions && (actions = {...actions, ...extActions})
  return Object.keys(actions).reduce((acc, name) => {
    const action = actions[name]("RHM%BYPASS")
    acc[name] = createAction(`${action.type}${namespace}`, action.payload)
    return acc
  }, {})
}

export default annotateActions
