import {connect} from "react-redux";
import {bindActionCreators, combineReducers} from "redux";
import {createReduxUtils, mergeReduxUtils, extendReduxUtils, createAction} from "rhm";


// Children.
import {overview} from "./screens/overview";


// Component.
import Landing from "./landing";

// ---- Redux ------------------

import * as actions from "./redux/actions";
import * as reducer from "./redux/reducer";


// Redux Utilities.
const landing = createReduxUtils("landing", {reducer, actions});
// export const main = mergeReduxUtils(landing, overview)
// const deep = mergeReduxUtils("deep", landing, overview)

// const ext = extendReduxUtils("ext", landing, "EXT", {reducer, actions})

// export const main = mergeReduxUtils("main", deep, overview)

const ext = extendReduxUtils("landingExt", landing, "", {
  reducer: {
    EXT_ME: ( _ , {ext}) => ({ext: ext + 10})
  },
  initState: {
    ext: 1
  },
  actions: {
    extMe: createAction("EXT_ME")
  },
  selectors: {
    getExt: state => state.ext
  }
});

export const main = mergeReduxUtils("main", ext, overview);



// ---- Connect ----------------

const {actions: landingActions, selectors} = ext;

const mapStateToProps = (state, props) => {
  return {
    ext: selectors.getExt(state),
    multi: selectors.getMulti(state),
    counter: selectors.getCount(state, props)
  }
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(landingActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Landing);
