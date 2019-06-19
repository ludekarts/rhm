// Main Component.
import Accordion from "./accordion";

// Redux.
import accordion from "./redux";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


// Connect.

const {actions, selectors} = accordion;

const mapStateToProps = state => ({
  open: selectors.getState(state),
  color: selectors.getColor(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);


// Exports API.
export {accordion};
export const Component = Accordion;
export default connect(mapStateToProps, mapDispatchToProps)(Accordion);
