import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import {
	reduxifyNavigator,
	createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

import { Main, Event, Rate, Login, Barcode, Yalla, Register } from "./screens";

const navigationMiddleware = createReactNavigationReduxMiddleware("root", (state) => state.nav);

const RootNavigator = createStackNavigator(
	{
		main: { screen: Main },
		event: { screen: Event },
		rate: { screen: Rate },
		login: { screen: Login },
		barcode: { screen: Barcode },
		yalla: { screen: Yalla },
		register: { screen: Register }
	},
	{ initialRouteName: "main", headerMode: "none" }
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, "root");

const mapStateToProps = (state) => ({
	state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, navigationMiddleware };
