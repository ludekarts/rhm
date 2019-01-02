import {mountReducers} from "rhm";
import {combineReducers} from "redux";

// Screens.
import {main} from "../screens/landing";

// Main Reducer.
export default combineReducers(mountReducers(main));
