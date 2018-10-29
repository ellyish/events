import { combineReducers } from "redux";
import app from "./app";
import events from "./events";
import modal from "./modal";
import navigation from "./navigation";
import user from "./user";

export const rootReducer = combineReducers({
	user,
	nav: navigation,
	app,
	invoices: {},
	events,
	modal
});

export default rootReducer;
