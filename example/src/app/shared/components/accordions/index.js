
// Redux.
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {extendReduxUtils, mergeReduxUtils} from "rhm";


// Main Accordion that will be extended.
import {Component as Accordion, accordion} from "components/accordion";


// ---- Accordion Orange ----------------
const acc_orange = extendReduxUtils("acc_orange", accordion, "ORANGE", {initState: {color: "#ffc107", open: false}});
export const AccordionOrange = createAccordion(Accordion, acc_orange);


// ---- Accordion Green ----------------
const acc_green = extendReduxUtils("acc_green", accordion, "GREEN", {initState: {color: "#8bc34a", open: false}});
export const AccordionGreen = createAccordion(Accordion, acc_green);


// ---- Accordion Gray ----------------
const acc_magenta = extendReduxUtils("acc_magenta", accordion, "MAGENTA", {initState: {color: "#d81b60", open: false}});
export const AccordionMagenta = createAccordion(Accordion, acc_magenta);


// ---- Export All Utilities ----------
export const accordions = mergeReduxUtils(acc_orange, acc_green, acc_magenta);




// Connect Helper.

function createAccordion(Component, utils) {
  const {actions, selectors} = utils;
  const mapStateToProps = state => ({
    open: selectors.getState(state),
    color: selectors.getColor(state)
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(actions, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(Component);
}
