import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, Dimensions, TouchableOpacity } from "react-native";
import { MapView, Location, Permissions } from "expo";
import { withMappedNavigationProps } from "react-navigation-props-mapper";
import DateTimePicker from "react-native-modal-datetime-picker";
import { SubHeader } from "../../semiScreen";
import { colors } from "../../theme";

const { width } = Dimensions.get("window");

const { labelColors } = colors;

export class YallaPure extends Component {
	constructor(props) {
		super(props);
		const { navigation } = props;
		const {
			position
			// } = this.props;
		} = navigation.state.params.event;
		this.state = {
			isDateTimePickerVisible: false,
			region: {
				latitude: position.lat,
				longitude: position.lng,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			}
		};
	}
	state = {
		hasCameraPermission: null
	};

	componentDidMount() {
		this._requestCameraPermission();
	}

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = (date) => {
		console.log("A date has been picked: ", date);
		// const { event } = this.props;
		// const { position } = event;
		// this.yallaCareem({
		// 	latitude: position.lat,
		// 	longitude: position.lng,
		// 	latitudeDelta: 0.0922,
		// 	longitudeDelta: 0.0421
		// });
		this._hideDateTimePicker();
	};

	_requestCameraPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			hasCameraPermission: status === "granted"
		});
	};

	yallaCareem(event) {
		fetch("https://interface.careem.com/v1/bookings", {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: "ugb2h2e7k5433hr1thvf3ivfhb"
			},
			body: JSON.stringify({
				product_id: 672,
				pickup_details: {
					...this.state.region,
					nickname: "john"
				},
				dropoff_details: {
					...event,
					nickname: "john"
				},
				driver_notes: "some notes",
				// booking_type: "NOW",
				promo_code: "",
				booking_type: "LATER",
				pickup_time: new Date("2018.12.10").getTime(),
				customer_details: {
					uuid: this.props.userId.slice(18, 33),
					name: "Test",
					phone_number: "9647721449291",
					email: this.props.email
				}
			})
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
	}

	render() {
		const { event, userId } = this.props;
		const { address, position } = event;
		return (
			<View style={styles.container}>
				<SubHeader title="Yalla" />
				<DateTimePicker
					mode="time"
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
				/>
				<View style={styles.descriptionMapContainer}>
					<MapView
						style={styles.map}
						minZoomLevel={14}
						zoomControlEnabled={true}
						onRegionChange={this.onRegionChange.bind(this)}
						showsMyLocationButton={true}
						showsUserLocation={true}
						// scrollEnabled={false}
						initialRegion={{
							latitude: position.lat,
							longitude: position.lng,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						}}>
						<MapView.Marker
							title={address}
							coordinate={{
								...this.state.region
							}}
						/>
					</MapView>
				</View>
				<View style={styles.evenButtonContainer}>
					<TouchableOpacity
						style={styles.yallaButton}
						block
						onPress={() => {
							this._showDateTimePicker();
						}}>
						<Text style={styles.textYallaButton}>Take Me to The Event</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	onRegionChange(region) {
		this.setState({ region });
	}
	setMarkers() {
		return (
			<MapView.Marker
				key={1}
				coordinate={{ latitude: 52.36, longitude: 4.88 }}
				title={"Some Title"}
				description={"Hello world"}
			/>
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
	},
	descriptionMapContainer: {
		flex: 1,
		width,
		padding: 20,
		paddingBottom: 5,
		backgroundColor: "red"
	},
	map: {
		position: "absolute",
		top: 0,
		right: 0,
		left: 0,
		bottom: 0
		// alignSelf: "stretch",
		// marginTop: 10,
		// height: 300
	},
	evenButtonContainer: {
		// flex: 1,
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-around"
	},
	checkInButton: {
		flex: 1,
		backgroundColor: colors.graySemiDark,
		marginRight: 5,
		justifyContent: "center"
	},
	textCheckInButton: {
		textAlign: "center",
		color: colors.white
	},
	yallaButton: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#37b44e",
		padding: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	textYallaButton: {
		textAlign: "center",
		color: colors.white
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
		userId: state.user.userId,
		email: state.user.email
	};
};

export const Yalla = connect(
	mapStateToProps,
	mapDispatchToProps
)(withMappedNavigationProps()(YallaPure));
