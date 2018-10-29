import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Linking,
	Animated,
	Alert,
	InteractionManager
} from "react-native";
import { MapView, Permissions, LinearGradient } from "expo";
import { withMappedNavigationProps } from "react-navigation-props-mapper";

import { Icon } from "../../nativeComponents";
import { Rate } from "../../components";
import { TransHeader } from "../../semiScreen";
import { dayName as days } from "../../redux";
import { colors, fontSizes } from "../../theme";

const { width, height } = Dimensions.get("window");
const placeButtonHeight = width * 0.08;
const placeButtonWidth = width * 0.33;
const imageHeight = height * 0.6;
const titleHeight = width * 0.2;
const titleWidth = width * 0.8;
const organizerMarginTop = titleHeight * 0.66;
const dateWidth = titleHeight;
const dateHeight = titleHeight;
const footerHeight = (height * 0.17) / 1.6;
const { labelColors } = colors;

class Event extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showRate: false, didFinishInitialAnimation: false };
		this.scrollAnimatedValue = new Animated.Value(0);
	}

	async bookNow() {
		const { url } = this.props.item;
		Linking.canOpenURL(url)
			.then((supported) => {
				if (supported) {
					Linking.openURL(url);
				} else {
					console.log("Don't know how to open URI: " + url);
				}
			})
			.catch((e) => {
				console.log("Error ", e);
			});
	}

	async yallaCareem() {
		const { item, navigate, isLogin } = this.props;
		if (!isLogin) {
			Alert.alert(
				"Check In",
				"Login first to be able to book a taxi with Careem",
				[
					{ text: "Dismiss", onPress: () => console.log("Ask me later pressed") },
					// { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
					{ text: "Login", onPress: () => navigate("login") }
				],
				{ cancelable: true }
			);
			return;
		}
		if (__DEV__) {
			navigate("yalla", { event: item });
			return;
		}
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== "granted") {
			alert("You cant register as attendance");
		} else {
			navigate("yalla", { event: item });
		}
	}

	async checkIn() {
		const { item, navigate, isLogin } = this.props;
		if (!isLogin) {
			Alert.alert(
				"Check In",
				"Login first to be able to check-in",
				[
					{ text: "Dismiss", onPress: () => console.log("Ask me later pressed") },
					// { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
					{ text: "Login", onPress: () => navigate("login") }
				],
				{ cancelable: true }
			);
			return;
		}
		if (__DEV__) {
			navigate("barcode", { event: item });
			return;
		}
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== "granted") {
			alert("You cant register as attendance");
		} else {
			navigate("barcode", { eventId: item });
		}
	}

	closeRate() {
		this.setState({ showRate: false });
	}

	openRate() {
		const { item, attendingEvents } = this.props;
		if (attendingEvents.find(({ eventId }) => item.id == eventId))
			this.setState({ showRate: true });
		else alert("Check-in first to be able to rate this event");
	}

	toTitleCase(str) {
		if (str.charCodeAt() < 265)
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		return str;
	}

	render() {
		if (this._scrollView)
			this._scrollView
				.getScrollResponder()
				.scrollTo({ x: 0, y: this.scrollAnimatedValue, animated: true });
		const { item, userId } = this.props;
		const { showRate, didFinishInitialAnimation } = this.state;
		const {
			id,
			image_url,
			date,
			organizer,
			title,
			type,
			address,
			description,
			position
			// } = this.props;
		} = item;
		const dateInfo = new Date(date);
		const backgroundColor = {
			backgroundColor: labelColors[type.toLowerCase()]
				? labelColors[type.toLowerCase()]
				: labelColors["default"]
		};
		const textTitle = title.charCodeAt() < 265 ? styles.textTitle : styles.textTitleAr;
		const textDescription =
			description.charCodeAt() < 265 ? styles.textDescription : styles.textDescriptionAr;
		const lengthTitle = title.charCodeAt() < 265 ? 24 : 18;

		if (!title) return <View />;
		return (
			<View style={styles.container}>
				<Rate
					showRate={showRate}
					closeRate={this.closeRate.bind(this)}
					eventId={id}
					userId={userId}
				/>
				<View style={styles.headerContainer}>
					<TransHeader
					// right={
					// 	<TouchableOpacity
					// 		style={[styles.rateButton, backgroundColor]}
					// 		activeOpacity={0.7}
					// 		onPress={() => this.openRate()}>
					// 		<Text style={styles.textRate}>Rate</Text>
					// 		<Icon name="star" font="Entypo" style={styles.iconRate} />
					// 	</TouchableOpacity>
					// }
					/>
					<Image source={{ uri: image_url }} resizeMode="cover" style={styles.image} />
				</View>
				<Animated.ScrollView
					style={styles.scrollMain}
					onScroll={Animated.event([
						{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } } }
					])}>
					<Animated.View
						style={[
							styles.imageOverly,
							{
								opacity: this.scrollAnimatedValue.interpolate({
									inputRange: [0, imageHeight],
									outputRange: [0, 0.5],
									extrapolateRight: "clamp"
								})
							}
						]}
					/>
					<View style={styles.detailsContainer}>
						<View style={styles.organizerContainer}>
							<Text style={styles.textOrganizerBy}>Organized by</Text>
							<Text style={[styles.textOrganizer]}>{this.toTitleCase(organizer)}</Text>
						</View>
						{didFinishInitialAnimation ? (
							<View style={styles.descriptionMapContainer}>
								<Text style={textDescription}>{description}</Text>
								<MapView
									style={styles.map}
									minZoomLevel={14}
									zoomControlEnabled={true}
									scrollEnabled={false}
									initialRegion={{
										latitude: position.lat,
										longitude: position.lng,
										latitudeDelta: 0.0922,
										longitudeDelta: 0.0421
									}}>
									<MapView.Marker
										title={address}
										coordinate={{
											latitude: position.lat,
											longitude: position.lng
										}}
									/>
								</MapView>
							</View>
						) : null}
					</View>
					<View style={[styles.titleContainer, backgroundColor]}>
						<View style={styles.dateContainer}>
							<Text style={styles.textDayNumber}>{dateInfo.getDate()}</Text>
							<Text style={styles.textDayWeek}>{days[dateInfo.getDay()]}</Text>
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.textType}>{type.toUpperCase()}</Text>
							<Text style={textTitle}>
								{title.length > lengthTitle
									? title.toUpperCase().slice(0, lengthTitle) + "..."
									: title.toUpperCase()}
							</Text>
						</View>
					</View>
					<Animated.View
						style={{
							height: this.scrollAnimatedValue.interpolate({
								inputRange: [0, imageHeight / 5, imageHeight / 4],
								outputRange: [imageHeight * 4, 0, footerHeight],
								extrapolateRight: "clamp"
							})
						}}
					/>
				</Animated.ScrollView>
				<View style={styles.footerContainer}>
					<View
						colors={["#4c669f", "#3b5998", "#192f6a"]}
						style={{
							position: "absolute",
							backgroundColor: "white",
							top: 15,
							right: 0,
							left: 0,
							bottom: 0
							// padding: 15,
							// alignItems: "center",
							// borderRadius: 5
						}}
					/>
					<LinearGradient
						colors={["transparent", "#ffffff", "#ffffff"]}
						style={{
							position: "absolute",
							top: 0,
							right: 0,
							left: 0,
							bottom: footerHeight - 20
							// alignItems: "center",
							// borderRadius: 5
						}}
					/>
					<View style={styles.bookNowContainer}>
						<TouchableOpacity
							style={[styles.bookNowButton, backgroundColor]}
							onPress={() => this.bookNow()}>
							<Text style={styles.textBookNowButton}>Book Now</Text>
						</TouchableOpacity>
					</View>
					{/* <View style={styles.evenButtonContainer}>
						<TouchableOpacity style={styles.checkInButton} block onPress={() => this.checkIn()}>
							<Text style={styles.textCheckInButton}>Check-In</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.yallaButton} block onPress={() => this.yallaCareem()}>
							<Text style={styles.textYallaButton}>Yalla with</Text>
							<Image
								source={require("../../../assets/icon/careem.png")}
								style={{ height: 30, width: 30 }}
							/>
						</TouchableOpacity>
					</View> */}
				</View>
			</View>
		);
	}

	componentDidMount() {
		// 1: Component is mounted off-screen
		InteractionManager.runAfterInteractions(() => {
			// 2: Component is done animating
			// 3: Start fetching the team
			// this.props.dispatchTeamFetchStart();

			// 4: set didFinishInitialAnimation to false
			// This will render the navigation bar and a list of players
			this.setState({
				didFinishInitialAnimation: true
			});
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		width: width
	},

	headerContainer: {
		position: "absolute",
		top: 0,
		left: 0
	},
	rateButton: {
		flexDirection: "row",
		height: placeButtonHeight,
		// width: placeButtonWidth,
		backgroundColor: colors.transparentLight,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
		padding: 5
	},
	iconRate: {
		textAlign: "center",
		fontSize: fontSizes.small.n,
		color: colors.white,
		paddingLeft: 5
	},
	textRate: {
		textAlign: "center",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.s,
		color: colors.white,
		paddingHorizontal: 5
	},
	image: { height: imageHeight, width: width, backgroundColor: colors.white },
	scrollMain: { flex: 1 },
	imageOverly: {
		height: imageHeight,
		backgroundColor: colors.grayDark
	},
	detailsContainer: { backgroundColor: colors.white },
	organizerContainer: { paddingHorizontal: 20 },
	textOrganizerBy: {
		textAlignVertical: "center",
		fontFamily: "DiodrumArabicSemibold",
		marginTop: organizerMarginTop,
		fontSize: fontSizes.small.xs,
		lineHeight: fontSizes.small.xs,
		color: colors.gray
	},
	textOrganizer: {
		fontFamily: "DiodrumArabicSemibold",
		textAlign: "left",
		fontSize: fontSizes.small.n,
		lineHeight: fontSizes.small.n,
		paddingTop: 2
	},
	descriptionMapContainer: { padding: 20, paddingBottom: 5 },
	textDescription: {
		// fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.s
		// lineHeight: fontSizes.medium
	},
	textDescriptionAr: {
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.s,
		lineHeight: fontSizes.medium
	},
	map: { alignSelf: "stretch", marginTop: 10, height: 300 },
	titleContainer: {
		width: titleWidth,
		height: titleHeight,
		flexDirection: "row",
		position: "absolute",
		backgroundColor: colors.white,
		left: 20,
		top: imageHeight - titleHeight / 2
	},
	dateContainer: {
		flex: 1,
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: colors.graySemiDark,
		width: dateWidth,
		height: dateHeight
	},
	textDayNumber: {
		textAlign: "center",
		fontFamily: "TextaAltBold",
		lineHeight: fontSizes.large.xxl,
		fontSize: fontSizes.large.xxl,
		color: colors.white
	},
	textDayWeek: {
		textAlign: "center",
		color: colors.white,
		fontFamily: "DiodrumArabicSemibold",
		lineHeight: fontSizes.small.xs,
		fontSize: fontSizes.small.xs
	},
	textContainer: {
		flex: 3,
		justifyContent: "space-around",
		padding: 10
	},
	textType: {
		fontFamily: "TextaAlt",
		fontSize: fontSizes.small.n,
		lineHeight: fontSizes.small.n,
		color: colors.white
	},
	textTitle: {
		textAlign: "left",
		// fontWeight: "bold",
		fontFamily: "TextaAltBold",
		fontSize: fontSizes.medium,
		lineHeight: fontSizes.medium,
		color: colors.white
	},
	textTitleAr: {
		textAlign: "left",
		// fontWeight: "bold",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.medium,
		lineHeight: fontSizes.medium,
		color: colors.white
	},
	footerContainer: {
		height: footerHeight,
		paddingBottom: 10,
		paddingTop: 15,
		paddingHorizontal: 20,
		width: width,
		position: "absolute",
		bottom: 0,
		left: 0
		// backgroundColor: colors.white
	},
	bookNowContainer: {
		flex: 1,
		paddingVertical: 5,
		flexDirection: "row",
		alignContent: "center"
	},
	bookNowButton: {
		flex: 1,
		backgroundColor: colors.white,
		justifyContent: "center"
	},
	textBookNowButton: {
		textAlign: "center",
		color: colors.white
	},
	evenButtonContainer: {
		flex: 1,
		paddingVertical: 5,
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
		marginLeft: 5,
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
import { navigate, rateEvents } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ navigate, rateEvents }, dispatch);
};

const mapStateToProps = (state) => {
	// return { item: index > 0 ? routes[index].params.item : undefined };
	return {
		userId: state.user.userId,
		isLogin: state.user.isLogin,
		attendingEvents: state.user.attendingEvents
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withMappedNavigationProps()(Event));
