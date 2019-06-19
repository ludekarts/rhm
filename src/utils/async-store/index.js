import {combineReducers} from "redux";

export default (function asyncStore() {

  let asyncReducers = {};

  return (store, staticReducers) => {

    store.addAsyncReducer = module => {

      // Extreact storeHooks from Component.
      Object.keys(module).forEach(key => {
        if (module[key].storeHook) {
          Object.keys(module[key].storeHook).forEach(redName => {

            if (process.env.NODE_ENV !== "production") {
              if (asyncReducers[redName]) {
                throw new Error(`Duplicated async reducer: "${redName}".`);
              }
            }

            asyncReducers[redName] = module[key].storeHook[redName];
          });
        }
      });

      // Update Redux Stroe.
      store.replaceReducer(combineReducers({
        ...staticReducers,
        ...asyncReducers
      }));

      return module;
    };

    return store;
  }
}());
