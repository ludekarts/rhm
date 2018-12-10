import {isObject} from "../../helpers";
import mountSelectors from "../mount-selectors";
import combineReducers from "../combine-reducers";
import resolveSelectors from "../resolve-selectors";

// Merges given utilities under one namespace OR flat merge if no namespace.
const mergeReduxUtils = (namespace, ...utilities) => {

  // Flat merge.
  if (isObject(namespace) && namespace.storeHook) {
    utilities.push(namespace);
    console.log("->", namespace, utilities);

    const merge = utilities.reduce((acc, entry, index) => {
      const {storeHook} = entry;
      // Combine Hooks.
      acc.hooks = {...acc.hooks, ...storeHook};
      // Merge utils under its name.
      acc.utils[Object.keys(storeHook)[0]] = entry
      return acc;
    }, {
      hooks: {}, utils: {}
    });

    const response = {storeHook: merge.hooks, ...merge.utils};
    console.log("FLAT MERGE:", response);
    return response;
  }

  // Merge under one namespace.
  else if (typeof namespace === "string" && utilities.length) {

    const merge = utilities.reduce((acc, entry, index) => {
      console.log("::", entry);
      const {storeHook} = entry;
      // Combine Hooks.
      acc.hooks = {...acc.hooks, ...storeHook};

      // Merge utils under its name.
      acc.utils[Object.keys(storeHook)[0]] = resolveSelectors(entry, namespace);

      return acc;
    }, {
      hooks: {}, utils: {}
    });

    const response = {
      storeHook: {[namespace]: combineReducers(merge.hooks)},
      ...merge.utils
    };

    console.log("MERGED:", response);
    return response;
  }
}

export default mergeReduxUtils;
