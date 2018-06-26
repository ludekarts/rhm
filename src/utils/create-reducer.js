import {isPrimitive, isAction, isObject, mergeStateObjects} from "./helpers"


// Create Reducer Helper.
// NOTE: All objects from the reducer function will be flat merge e.g.: {...state, myValue: 12}
//       with default state. So just return a slice of the state you'd like to update e.g.: {myValue: 12}.
//
// USAGE:
//
// const reducer = createReducer({
//   ACTION_TYPE_A: (payload, state, args) => ({key: value}),
//   ACTION_TYPE_B: (payload, state, args) => value,
//   ACTION_TYPE_C: {key: value},
//   ACTION_TYPE_D: value
// }, ...)(initialState, ...)
//
const createReducer = (...args) => {
  // if (args.length % 2 !== 0 || args.length === 0)
  //   throw new Error("Arguments for \"createReducer\" has ODD numbers of arguments.\nCorect pattern is: createReducer(ACTION_NAME, reducer, ...)")

  // const cases = chunk(args, 2).reduce((acc, [action_type, reducer]) => {
  //   if (!isAction(action_type)) throw new Error("Incorrect action type in \"createReducer()\"")
  //   acc[action_type] = reducer
  //   return acc
  // }, {})

  const cases = args.reduce((acc, _case, index) => {
    if (!isObject(_case))
      throw new Error(`Incorrect argument in \"createReducer()\" at index: [${index}]. All arguments should be Objects`)

    Object.keys(_case).forEach((action_type, caseIndex) => {
      if (!isAction(action_type))
        throw new Error(`Incorrect action type in \"createReducer()\" at argument: [${index}] in case: [${caseIndex}]`)

      acc[action_type] = _case[action_type]
    })

    return acc
  }, {})

  return (...initialState) => {

    // Allow for merging multiple objects in one initialState.
    const mergedInitialState = initialState.length === 1
      ? initialState[0]
      : mergeStateObjects(initialState)

    return (state = mergedInitialState, action, exit = false) => {

      // Exit with reducer's args & initialState => for actions customization.
      if (state === null && action === null && exit) return [args, initialState]

      // Default reducing logic.
      const reducer = cases[action.type]
      if (reducer) {
        if (isPrimitive(reducer)) {
          return reducer
        }
        else if (typeof reducer === "function") {
          const itm = reducer(action.payload, state, action.args)
          return isPrimitive(itm) ? itm : {...state, ...itm}
        }
        // Plain object.
        else return {...state, ...reducer}
      }
      else return state
    }
  }
}

export default createReducer
