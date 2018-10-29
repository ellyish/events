import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	StyleSheet,
	Dimensions,
	Linking
} from "react-native";
import { dayName as days } from "../../../redux";
import { colors, fontSizes, images } from "../../../theme";

const placeHolderSmall = require("../../../../assets/images/placeHolderSmall.png");

const { width } = Dimensions.get("window");
const elementWidth = width * 0.45;
const elementMargin = width * 0.025;
const elementHeight = elementWidth * 1.15;
const detailsWidth = elementWidth * 0.85;
const detailsHeight = elementHeight * 0.2;
const imageHeight = elementWidth;
const dateWidth = imageHeight * 0.3;
const dateHeight = imageHeight * 0.3;
const { labelColors } = colors;

export class EventItem extends React.PureComponent {
	showEvent = () => {
		this.props.onClick(this.props.item);
	};

	bookNow = () => {
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
	};

	render() {
		const { index, item, onClick } = this.props;
		const { image_url, date, type, organizer, title } = item;
		const backgroundColor = {
			backgroundColor: labelColors[type.toLowerCase()]
				? labelColors[type.toLowerCase()]
				: labelColors["default"]
		};
		const textTitle = title.charCodeAt() < 265 ? styles.textTitle : styles.textTitleAr;
		const lengthTitle = title.charCodeAt() < 265 ? 21 : 28;
		return (
			<TouchableOpacity style={styles.container} activeOpacity={0.4} onPress={this.showEvent}>
				<ImageBackground
					resizeMode="cover"
					source={image_url ? { uri: image_url } : placeHolderSmall}
					defaultSource={placeHolderSmall}
					style={styles.image}>
					<View style={[styles.dateContainer, backgroundColor]}>
						<Text style={styles.textDayNumber}>{new Date(date).getDate()}</Text>
						<Text style={styles.textDayWeek}>{days[new Date(date).getDay()]}</Text>
					</View>
				</ImageBackground>
				<View style={[styles.detailsContainer, backgroundColor]}>
					<View style={[styles.textContainer]}>
						<Text style={styles.textType}>{type.toUpperCase()}</Text>
						<Text style={textTitle}>
							{title.length > lengthTitle
								? title.toUpperCase().slice(0, lengthTitle) + "..."
								: title.toUpperCase()}
						</Text>
					</View>
					{/* <TouchableOpacity
						style={styles.bookButton}
						activeOpacity={0.7}
						onPress={() => this.bookNow()}>
						<Text style={styles.textBook}>^</Text>
					</TouchableOpacity> */}
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: elementWidth,
		height: elementHeight,
		margin: elementMargin
	},
	image: {
		height: imageHeight,
		width: elementWidth
	},
	dateContainer: {
		width: dateWidth,
		height: dateHeight,
		position: "absolute",
		right: 0,
		top: 0,
		padding: 4
	},
	textDayNumber: {
		textAlign: "center",
		fontFamily: "TextaAltBold",
		lineHeight: fontSizes.large.l,
		fontSize: fontSizes.large.l,
		color: colors.white
	},
	textDayWeek: {
		textAlign: "center",
		color: colors.white,
		fontFamily: "DiodrumArabicSemibold",
		lineHeight: fontSizes.small.xxxs,
		fontSize: fontSizes.small.xxxs
	},
	detailsContainer: {
		width: detailsWidth,
		height: detailsHeight,
		alignItems: "center",
		flexDirection: "row",
		position: "absolute",
		right: 0,
		bottom: 0
	},
	textContainer: {
		// flex: 0.7,
		width: elementWidth,
		paddingLeft: 5
		// paddingTop: 3
	},
	textType: {
		padding: 0,
		fontFamily: "TextaAlt",
		fontStyle: "italic",
		fontSize: fontSizes.small.xs,
		lineHeight: fontSizes.small.xs,
		padding: 2,
		color: colors.white
	},
	textTitle: {
		textAlign: "left",
		// fontWeight: "bold",
		fontStyle: "italic",
		fontFamily: "TextaAltBoldItalic",
		fontSize: fontSizes.small.xs,
		lineHeight: fontSizes.small.xs,
		padding: 2,
		color: colors.white
	},
	textTitleAr: {
		textAlign: "left",
		// fontWeight: "bold",
		// fontStyle: "italic",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.xs,
		lineHeight: fontSizes.small.xs,
		color: colors.white
	},
	textOrganizer: {
		textAlignVertical: "center",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.xxs,
		color: colors.white
		// fontWeight: "bold"
	},
	bookButton: {
		flex: 0.3,
		justifyContent: "center"
	},
	textBook: {
		textAlign: "center",
		fontFamily: "DiodrumArabicSemibold",
		color: colors.white
	}
});
