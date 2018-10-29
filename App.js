import React from "react";
// symbol polyfills
global.Symbol = require("core-js/es6/symbol");
require("core-js/fn/symbol/iterator");
// collection fn polyfills
require("core-js/fn/map");
require("core-js/fn/set");
require("core-js/fn/array/find");
import { I18nManager, StatusBar, View, Platform } from "react-native";
import Provider from "./app/Provider";
import MainApp from "./app/App";

if (Platform.OS === "android") {
	if (typeof Symbol === "undefined") {
		if (Array.prototype["@@iterator"] === undefined) {
			Array.prototype["@@iterator"] = function() {
				let i = 0;
				return {
					next: () => ({
						done: i >= this.length,
						value: this[i++]
					})
				};
			};
		}
	}
}

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
StatusBar.setBackgroundColor("#000000");

export class App extends React.Component {
	render() {
		// return <View style={{ flex: 1, backgroundColor: "red" }} />;
		return (
			<Provider>
				<MainApp />
			</Provider>
		);
	}
}

export default App;
