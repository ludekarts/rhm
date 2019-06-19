// DESCRIPTION:
// This is the rootReducer that combines all Redux Reducting logic.

import {mountReducers} from "rhm";
import {combineReducers} from "redux";

// Import Screens. App is structured base on the UI screens.
// import {main} from "../screens/landing";

// Import shred components.
import {accordion} from "components/accordion";
import {accordions} from "components/accordions";

// Export Root Reducer.
export default combineReducers(mountReducers(accordion, accordions));
