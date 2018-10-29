import React from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Linking,
	Modal,
	Animated,
	InteractionManager
} from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import { Icon, RatingBar } from "../../nativeComponents";
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
const footerHeight = 60;
const { labelColors } = colors;

class Event extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isRate: false, showRate: false, rate: 1, didFinishInitialAnimation: false };
		this.scrollAnimatedValue = new Animated.Value(0);
	}

	async bookNow() {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== "granted") {
			alert("You cant register as attends");
		} else {
			this.props.navigate("barcode");
		}

		// console.log("bookNow");
		// const { url } = this.props.navigation.state.params.item;
		// Linking.canOpenURL(url)
		// 	.then((supported) => {
		// 		if (supported) {
		// 			Linking.openURL(url);
		// 		} else {
		// 			console.log("Don't know how to open URI: " + url);
		// 		}
		// 	})
		// 	.catch((e) => {
		// 		console.log("Error ", e);
		// 	});
	}
	rate(rate) {
		this.setState({ isRate: true, rate: rate });
	}
	rateIt() {
		console.log("Rate it");
		const { navigation, pushid } = this.props;
		let rate = this.state.rate ? this.state.rate : 1;
		this.props.rateEvents(navigation.state.params.item.id, pushid, rate);
		this.closeRate();
	}
	closeRate() {
		this.setState({ showRate: false });
	}
	next() {
		console.log(this.props.navigation.state.params.item.short_code, this.state.short_code);
		if (this.props.navigation.state.params.item.short_code + "" == this.state.short_code + "")
			this.setState({ showRate: true });
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
		const {
			image_url,
			date,
			organizer,
			title,
			type,
			address,
			address_ar,
			description,
			position
			// } = this.props;
		} = this.props.navigation.state.params.item;
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
		if (!this.state.didFinishInitialAnimation) return <View />;
		return (
			<View style={styles.container}>
				<Modal
					animationType="fade"
					hardwareAccelerated={true}
					transparent={true}
					visible={this.state.showRate}
					onRequestClose={() => {
						this.closeRate();
					}}>
					<View style={[styles.modalRate, { backgroundColor: "rgba(52, 52, 52, 0.8)" }]}>
						<View style={styles.rateContainer}>
							<View style={styles.rateHeader}>
								<Text style={styles.rateTextHeader}>How Was It?</Text>
							</View>
							<View style={styles.rateBody}>
								<RatingBar
									maxStars={5}
									rating={1}
									selectStar={{ name: "star", font: "Entypo", size: 40 }}
									unSelectStar={{ name: "star", font: "EvilIcons", size: 40 }}
									iconStyle={styles.iconStyle}
									style={styles.ratingBar}
									valueChanged={(rate) => {
										console.log(rate);
										this.rate(rate);
									}}
								/>
								<View style={styles.iconTitleContainer}>
									<View style={{ flex: 1 }}>
										<Text style={styles.iconTitle}>Very</Text>
										<Text style={styles.iconTitle}>Bad</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={styles.iconTitle}>Bad</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={styles.iconTitle}>Good</Text>
										<Text style={styles.iconTitle}>Enough</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={styles.iconTitle}>Very</Text>
										<Text style={styles.iconTitle}>Good</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={styles.iconTitle}>Excellent</Text>
									</View>
								</View>
							</View>
							<View style={styles.rateFooter}>
								<TouchableOpacity
									underlayColor={colors.blueLight}
									style={styles.touchableButtonC}
									onPress={() => {
										this.closeRate();
									}}>
									<Text style={{ padding: 20 }}>Cancel</Text>
								</TouchableOpacity>
								<TouchableOpacity
									underlayColor={colors.blueLight}
									style={styles.touchableButtomO}
									onPress={() => {
										this.rateIt();
									}}>
									<Text style={{ padding: 20 }}>OK</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
				<View style={styles.headerContainer}>
					<TransHeader
						right={
							<TouchableOpacity
								style={[styles.placeButton, backgroundColor]}
								activeOpacity={0.7}
								onPress={() => console.log("Right")}>
								<Icon name="map-pin" font="Feather" style={styles.iconPlace} />
								<Text style={styles.textPlace}>{address_ar}</Text>
							</TouchableOpacity>
						}
					/>
					<Image source={{ uri: image_url }} resizeMode="cover" style={styles.image} />
				</View>
				<Animated.ScrollView
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } } }]
						// { useNativeDriver: true }
					)}
					style={styles.scrollMain}>
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
					{/* <View style={styles.footerOverly} /> */}
				</Animated.ScrollView>
				<View style={styles.footerContainer}>
					{this.state.isRate ? (
						<View style={styles.nextContainer}>
							<View style={styles.inputCodeContainer}>
								<TextInput
									style={styles.textInputCode}
									onChangeText={(short_code) => {
										this.setState({ short_code });
									}}
									placeholder={"Please Write Your Event Code Here"}
									underlineColorAndroid={colors.transparent}
								/>
								<View style={styles.line} />
							</View>
							<TouchableOpacity style={styles.nextButton} block onPress={() => this.next()}>
								<Text style={styles.textNextButton}>Next</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.footerContent}>
							<TouchableOpacity style={styles.bookNowButton} block onPress={() => this.bookNow()}>
								<Text style={styles.textBookNowButton}>Book Now</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.rateButton} block onPress={() => this.rate()}>
								<Text style={styles.textRateButton}>Rate</Text>
							</TouchableOpacity>
						</View>
					)}
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
	modalRate: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(52, 52, 52, 0.5)"
	},
	rateContainer: {
		height: 220,
		elevation: 5,
		marginHorizontal: 50,
		backgroundColor: colors.white
	},
	rateHeader: {
		flex: 1,
		justifyContent: "center"
		// borderRadius: 10,
		// backgroundColor: colors.blueCounter
	},
	rateTextHeader: {
		fontFamily: "TextaAltBold",
		fontSize: fontSizes.large.n,
		paddingLeft: 5
		// textAlign: "center"
	},
	rateBody: {
		flex: 2,
		justifyContent: "center",
		backgroundColor: colors.white10,
		padding: 10
		// paddingTop: 20
	},
	ratingContent: {
		flex: 1,
		justifyContent: "center"
	},
	ratingBar: { justifyContent: "space-around" },
	iconStyle: {
		color: colors.maron
		// padding: 2
	},
	iconTitleContainer: { flexDirection: "row" },
	iconTitle: { fontFamily: "TextaAlt", fontSize: fontSizes.small.s, textAlign: "center" },
	rateFooter: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
		// borderRadius: 10
	},
	headerContainer: {
		position: "absolute",
		top: 0,
		left: 0
	},
	placeButton: {
		flexDirection: "row",
		height: placeButtonHeight,
		// width: placeButtonWidth,
		backgroundColor: colors.transparentLight,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
		padding: 5
	},
	iconPlace: {
		textAlign: "center",
		fontSize: fontSizes.small.n,
		color: colors.white,
		paddingLeft: 5
	},
	textPlace: {
		textAlign: "center",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.xs,
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
	footerOverly: {
		height: footerHeight
	},
	footerContainer: {
		height: footerHeight,
		width: width,
		position: "absolute",
		bottom: 0,
		left: 0,
		backgroundColor: colors.white
	},
	nextContainer: {
		flex: 1,
		padding: 10,
		flexDirection: "row",
		backgroundColor: colors.nele,
		alignContent: "flex-end"
	},
	inputCodeContainer: {
		flex: 2,
		backgroundColor: colors.transparent,
		borderRadius: 4,
		marginHorizontal: 5,
		justifyContent: "flex-end"
	},
	textInputCode: {
		textAlign: "left",
		fontSize: fontSizes.small.s,
		color: colors.white
	},
	line: {
		height: 2,
		backgroundColor: colors.white,
		marginBottom: 5
	},
	nextButton: {
		flex: 1,
		backgroundColor: colors.white,
		// borderRadius: 4,
		marginHorizontal: 5,
		justifyContent: "center"
	},
	textNextButton: {
		textAlign: "center",
		color: colors.nele
	},
	footerContent: {
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "space-around"
	},
	bookNowButton: {
		flex: 1,
		backgroundColor: colors.graySemiDark,
		// borderRadius: 4,
		padding: 10,
		marginHorizontal: 5,
		justifyContent: "center"
	},
	textBookNowButton: {
		textAlign: "center",
		color: colors.white
	},
	rateButton: {
		flex: 1,
		backgroundColor: colors.gray,
		// borderRadius: 4,
		padding: 10,
		marginHorizontal: 5,
		justifyContent: "center"
	},
	textRateButton: {
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
		pushid: state.events.pushid
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Event);
