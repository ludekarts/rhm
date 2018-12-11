import {isObject} from "../../helpers";
import mountSelectors from "../mount-selectors";
import combineReducers from "../combine-reducers";
import annotateReducer from "../annotate-reducer";
import resolveSelectors from "../resolve-selectors";


const isFlatmerged = utils => utils.storeHook && Object.keys(utils.storeHook).length > 1;

// Merges given utilities under one namespace OR flat merge if no namespace.
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
