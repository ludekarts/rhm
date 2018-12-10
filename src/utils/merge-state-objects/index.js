import {isObject} from "../../helpers";

// Merge InitialState Objects.
const mergeStateObjects = args =>
  args.reduce((acc, arg, index) => {
    if (!isObject(arg))
      throw new Error(`Cannot merge initial states that are not Objects. Check initsial state at index: ${index}`);
    return {...acc, ...arg};
  }, {});


export default mergeStateObjects;
