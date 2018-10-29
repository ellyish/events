import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Modal,
	TextInput,
	Animated
} from "react-native";
import { RatingBar } from "../../nativeComponents";
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

class RatePure extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isRate: false, showRate: false, rate: 1, didFinishInitialAnimation: false };
		this.scrollAnimatedValue = new Animated.Value(0);
	}
	rateIt() {
		console.log("Rate it");
		const { navigation, userId, eventId } = this.props;
		let rate = this.state.rate ? this.state.rate : 1;
		this.props.rateEvents(eventId, userId, rate, this.state.comment);
		this.props.closeRate();
	}

	rate(rate) {
		this.setState({ rate });
	}

	render() {
		return (
			<Modal
				animationType="fade"
				hardwareAccelerated={true}
				transparent={true}
				visible={this.props.showRate}
				onRequestClose={() => {
					this.props.closeRate();
				}}>
				<View style={[styles.modalRate, { backgroundColor: "rgba(52, 52, 52, 0.8)" }]}>
					<View style={styles.rateContainer}>
						<View style={styles.rateHeader}>
							<Text style={styles.rateTextHeader}>How Was It?</Text>
						</View>
						<View style={styles.rateBody}>
							<View style={{ flex: 2 }}>
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
							<View style={styles.inputCommentContainer}>
								<TextInput
									scrollEnabled={true}
									style={styles.textInputComment}
									onChangeText={(comment) => {
										this.setState({ comment });
									}}
									multiline={true}
									placeholder={"Please Write Your Comment Here"}
									underlineColorAndroid={colors.transparent}
								/>
							</View>
						</View>
						<View style={styles.rateFooter}>
							<TouchableOpacity
								underlayColor={colors.blueLight}
								style={styles.touchableButtonC}
								onPress={() => {
									this.props.closeRate();
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
		);
	}
}

const styles = StyleSheet.create({
	modalRate: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(52, 52, 52, 0.5)"
	},
	rateContainer: {
		height: 270,
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
		flex: 3,
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
	image: { height: imageHeight, width: width, backgroundColor: colors.white },

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
		fontFamily: "DiodrDiodrumArabicSemiboldumArabic",
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
	inputCommentContainer: {
		flex: 1,
		backgroundColor: colors.transparent,
		borderRadius: 4,
		marginHorizontal: 5
	},
	textInputComment: {
		flex: 1,
		padding: 4,
		// textAlign: "left",
		backgroundColor: colors.white,
		fontSize: fontSizes.small.s
		// color: colors.white
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

export const Rate = connect(
	mapStateToProps,
	mapDispatchToProps
)(RatePure);
