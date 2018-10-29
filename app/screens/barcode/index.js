import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, Dimensions } from "react-native";
import { BarCodeScanner, Location, Permissions } from "expo";
import { withMappedNavigationProps } from "react-navigation-props-mapper";
import { SubHeader } from "../../semiScreen";
const { width, height } = Dimensions.get("window");
const right = width * 0.2;
const left = right;
const top = height * 0.7;

export class BarcodePure extends Component {
	state = {
		hasCameraPermission: null
	};

	componentDidMount() {
		this._requestCameraPermission();
	}

	_requestCameraPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			hasCameraPermission: status === "granted"
		});
	};

	_handleBarCodeRead = async (data) => {
		const { back, attendsEvents, userId, event } = this.props;
		const { id, short_code } = event;
		if (data.data == short_code) {
			Alert.alert("Scan successful!", JSON.stringify(data));
			let location = __DEV__ ? { x: 0, y: 0 } : await Location.getCurrentPositionAsync({});
			attendsEvents(id, userId, JSON.stringify(location), JSON.stringify(data));
			back();
		} else {
			alert("Check QR Code again!!");
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<SubHeader title="Check-In" />
				{this.state.hasCameraPermission === null ? (
					<Text>Requesting for camera permission</Text>
				) : this.state.hasCameraPermission === false ? (
					<Text>Camera permission is not granted</Text>
				) : (
					<View style={{ flex: 1 }}>
						<BarCodeScanner
							// torchMode="on"
							onBarCodeRead={this._handleBarCodeRead}
							style={{ width, height }}
						/>
						<View
							style={{
								position: "absolute",
								right,
								left,
								top,
								bottom: 0,
								alignContent: "center",
								justifyContent: "center"
							}}>
							<Text
								style={{
									marginHorizontal: 20,
									padding: 5,
									textAlign: "center",
									color: "white",
									borderColor: "white",
									borderWidth: 1,
									borderRadius: 3
								}}>
								Point to the QR Code
							</Text>
						</View>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// paddingTop: Constants.statusBarHeight,
		backgroundColor: "#ecf0f1"
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#34495e"
	}
});

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { navigate, attendsEvents, back } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ navigate, attendsEvents, back }, dispatch);
};

const mapStateToProps = (state) => {
	// return { item: index > 0 ? routes[index].params.item : undefined };
	return {
		userId: state.user.userId
	};
};

export const Barcode = connect(
	mapStateToProps,
	mapDispatchToProps
)(withMappedNavigationProps()(BarcodePure));
