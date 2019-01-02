import {connect} from "react-redux"
import {createReduxUtils} from "rhm"
import {bindActionCreators} from "redux"

// Component.
import Overview from "./overview"

// Redux.
import * as actions from "./redux/actions"
import * as reducer from "./redux/reducer"

export const overview = createReduxUtils("overview", {reducer, actions})


// ---- Connect ----------------

const {actions: overviewActions, selectors} = overview

const mapStateToProps = state => ({
  hits: selectors.getHits(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(overviewActions, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Overview)
