import {createAction} from "rhm";

// Fetch Actions.
export const helloLanding = createAction("LANDING_HELLO");
export const multiply = createAction("MULTIPLY", num => num);
