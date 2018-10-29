import React, { Component } from "react";
import { BackHandler } from "react-native";
import { Permissions, Notifications, Font } from "expo";

import { Drawer } from "./semiScreen";
import { Loading } from "./nativeComponents";
import { AppNavigator } from "./AppNavigator";
import { colors } from "./theme";

export class App extends Component {
	constructor(props) {
		super(props);
		BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
		this.state = {
			fontLoaded: false
		};
	}

	getNotificationId = async () => {
		const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			return;
		}
		return await Notifications.getExpoPushTokenAsync();
	};

	async componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
		const userId = await this.getNotificationId();
		this.props.login(userId);
		await Font.loadAsync({
			TextaAlt: require("../assets/fonts/TextaAlt-Regular.otf"), //english
			TextaAltBold: require("../assets/fonts/TextaAlt-Bold.otf"), //english
			TextaAltItalic: require("../assets/fonts/TextaAlt-Italic.otf"), //english
			TextaAltBoldItalic: require("../assets/fonts/TextaAlt-Bold-Italic.otf"), //english
			DiodrumArabic: require("../assets/fonts/DiodrumArabic-Light.ttf"), //arabic
			DiodrumArabicBold: require("../assets/fonts/DiodrumArabic-Bold.ttf"), //arabic
			DiodrumArabicSemibold: require("../assets/fonts/DiodrumArabic-Semibold.ttf") //arabic
		});
		this.setState({ fontLoaded: true });
		this.setNotification();
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
	}

	handleBackButton = () => {
		const { isDrawerOpen, nav, closeDrawer, back } = this.props;
		if (isDrawerOpen) {
			// alert("Drawer open");
			closeDrawer();
			return true; // do not exit app
		} else if (nav.routes.length > 1) {
			// alert("Back");
			back();
			return true; // do not exit app
		} else {
			// alert("Exit");
			// return true; // do not exit app
			return false; // exit app
		}
	};

	setNotification = async () => {
		// const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		// let finalStatus = existingStatus;
		// if (existingStatus !== "granted") {
		// 	const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		// 	finalStatus = status;
		// }
		// if (finalStatus !== "granted") {
		// 	return;
		// }
		// let token = await Notifications.getExpoPushTokenAsync();
		// this.props.addNotificationID(token, this.props.dispatch);
		// this._notificationSubscription = Notifications.addListener(this._handleNotification);
	};

	_handleNotification = () => {
		console.log("Test");
	};

	render() {
		let { dispatch, nav } = this.props;
		if (!this.state.fontLoaded) return <Loading color={colors.graySemiDark} />;
		return (
			<Drawer>
				<AppNavigator />
			</Drawer>
		);
	}
}

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { closeDrawer, back, login } from "./redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ closeDrawer, back, dispatch, login }, dispatch);
};

const mapStateToProps = (state) => ({
	nav: state.nav,
	state: state.nav,
	isDrawerOpen: state.app.open,
	loaded: true //state._persist.rehydrated
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
