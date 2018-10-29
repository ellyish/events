import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import navigationDebouncer from "react-navigation-redux-debouncer";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

import storage from "redux-persist/lib/storage";

import { rootReducer } from "./redux";
import { navigationMiddleware } from "./AppNavigator";

// const navReducer = createNavigationReducer(rootReducer);
const persistConfig = {
	key: "root",
	storage: storage,
	// stateReconciler: hardSet
	whitelist: ["invoices"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

let logger = createLogger({});
const navigationRedux = createReactNavigationReduxMiddleware("root", (state) => state.nav);
let middleware = __DEV__
	? [navigationMiddleware, thunk, navigationRedux, navigationDebouncer(600), logger]
	: [navigationMiddleware, thunk, navigationRedux, navigationDebouncer(600)];

const store = createStore(persistedReducer, applyMiddleware(...middleware));

export default class ProviderApp extends Component {
	render() {
		return (
			<Provider store={store}>
				{/* <Provider store={store} persistor={persistStore(store)}> */}
				{this.props.children}
			</Provider>
		);
	}
}
