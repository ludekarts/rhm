// ---- Test Async Actions ----------------

const testAsyncActions = () => {

  let timer;
  let resolveProise;
  let stopActionRegex = /\^/;

  const sniffer = store => next => action => {
    if (stopActionRegex.test(action.type)) {
      timer && clearTimeout(timer);
      resolveProise(action);
    }
    return next(action);
  };

  const listener = (action, timeout, resolveActionType) =>
    new Promise((resolve, reject) => {
      resolveProise = resolve;
      stopActionRegex = new RegExp(resolveActionType ? resolveActionType : `(${action.type}_COMPLETE|${action.type}_ERROR)`, "m");
      if (timeout)
        timer = setTimeout(() => reject("Async action time exeded"), timeout);
    });

  return {sniffer, listener};
}

export default testAsyncActions;
