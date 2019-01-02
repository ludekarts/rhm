import {isObject} from "../../helpers";
import mountSelectors from "../mount-selectors";
import combineReducers from "../combine-reducers";
import annotateReducer from "../annotate-reducer";
import resolveSelectors from "../resolve-selectors";

// Allows to deep/flat merge of redux-utils to helps create Store structure in more composible fashion.
// In other words it merges given utilities under one namespace OR flat merge if no namespace respecting
// all relations between reducres and it's slectors.
//
// USAGE:
/*

import {utils_one} from "./components/utilsOne";
import {utils_two} from "./components/utilsTwo";
import {utils_three} from "./components/utilsThree";


// ---- Merge under namespace ----------------

const mergedUtils = mergeReduxUtils("mergedName", utils_one, utils_two, utils_three);
export default mergedUtils;


// ---- Merge Flat ----------------

const mergedUtilsFlat = mergeReduxUtils(utils_one, utils_two, utils_three);
export default mergedUtilsFlat;

*/

const mergeReduxUtils = (namespace, ...utilities) => {

  // Flat merge.
  if (isObject(namespace) && namespace.storeHook) {

    utilities.push(namespace);

    const merge = utilities.reduce((acc, entry, index) => {
      const {storeHook, reducer, ...rest} = entry;

      if (process.env.NODE_ENV !== "production") {
        if (!storeHook && !reducer) {
          throw new Error(`Incorrect utilities. Method "mergeReduxUtils()" RHM's utilities to perform flat-merge`);
        }
      }

      // Combine Hooks.
      acc.hooks = {...acc.hooks, ...storeHook};

      // Move utils.
      isFlatmerged(entry)
        ? Object.keys(storeHook).forEach(hook => {acc.utils[hook] = entry[hook];})
        : acc.utils[Object.keys(storeHook)[0]] = entry;

      return acc;
    }, {
      hooks:{} , utils: {}
    });


    const response = {
      storeHook: merge.hooks,
      ...merge.utils
    };

    return response;

  }

  // Merge under one namespace.
  else {
    const merge = utilities.reduce((acc, entry, index) => {
      const {storeHook} = entry;

      // Combine Hooks.
      acc.hooks = {...acc.hooks, ...storeHook};

      // Merge utils under its name.
      isFlatmerged(entry)
        ? Object.keys(storeHook).forEach(hook => {acc.utils[hook] = resolveSelectors(entry[hook], namespace);})
        : acc.utils[Object.keys(storeHook)[0]] = resolveSelectors(entry, namespace);

      return acc;
    }, {
      hooks: {}, utils: {}
    });

    const response = {
      storeHook: {[namespace]: combineReducers(merge.hooks)},
      ...merge.utils
    };

    return response;

  }
}

export default mergeReduxUtils;


// ---- Helpers ----------------

function isFlatmerged(utils) {
  return utils.storeHook && Object.keys(utils.storeHook).length > 1;
}
