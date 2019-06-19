import {createCompactUtils} from "rhm";

export default createCompactUtils("accordion", {

  initState: {
    open: true,
    color: "#5c6bc0"
  },

  reducer: {
    TOGGLE_ACCORDION: ({state}) => ({open: !state.open})
  },

  actions: {
    accordionToggle: ["TOGGLE_ACCORDION"]
  },

  selectors: {
    getState: state => state.open,
    getColor: state => state.color
  }

});
