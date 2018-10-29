import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	Image,
	StyleSheet,
	Dimensions,
	Linking
} from "react-native";
import { Icon } from "../../../nativeComponents";
import { dayName as days, monthName as months } from "../../../redux";
import { colors, fontSizes, images } from "../../../theme";

const placeHolderSmall = require("../../../../assets/images/placeHolderSmall.png");

const { width, height } = Dimensions.get("window");
const elementMargin = 10;
const elementWidth = width - elementMargin * 2;
const elementHeight = height / 1.5;
const detailsWidth = elementWidth * 0.9;
const detailsHeight = elementHeight * 0.16;
const iconWidth = elementWidth * 0.08;
const iconHeight = iconWidth;
const imageHeight = elementHeight * 0.75;
const dateWidth = imageHeight * 0.3;
const dateHeight = imageHeight * 0.3;
const borderRadius = 2;
const { labelColors } = colors;

export class EventLarge extends React.PureComponent {
	showEvent = () => {
		this.props.onClick(this.props.item);
	};
	showTime = () => {
		console.log("Show Time");
		// this.props.onClick(this.props.item);
	};
	showLocation = () => {
		console.log("Show Location");
		// this.props.onClick(this.props.item);
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
		const { image_url, date, start_time, end_time, title, address, address_ar, type } = item;
		const dateInfo = new Date(date);
		const backgroundColor = {
			backgroundColor: labelColors[type.toLowerCase()]
				? labelColors[type.toLowerCase()]
				: labelColors["default"]
		};
		const textTitle = title.charCodeAt() < 265 ? styles.textTitle : styles.textTitleAr;
		const lengthTitle = title.charCodeAt() < 265 ? 13 : 17;
		return (
			<TouchableOpacity style={styles.container} activeOpacity={0.4} onPress={this.showEvent}>
				<ImageBackground
					resizeMode="cover"
					source={image_url ? { uri: image_url } : placeHolderSmall}
					defaultSource={placeHolderSmall}
					style={styles.image}>
					<View style={[styles.dateContainer, backgroundColor]}>
						<Text style={styles.textDayNumber}>{dateInfo.getDate()}</Text>
						<Text style={styles.textDayWeek}>{days[dateInfo.getDay()]}</Text>
					</View>
				</ImageBackground>
				<View style={[styles.infoContainer]}>
					<TouchableOpacity
						style={styles.timeContainer}
						activeOpacity={0.7}
						onPress={() => this.showTime()}>
						{/* <Icon name="calendar" font="FontAwesome" size={30} /> */}
						<Image source={images.calender} resizeMode="contain" style={styles.icon} />
						<View style={{ paddingLeft: 5 }}>
							<Text style={styles.textTime}>{`${start_time} - ${end_time}`}</Text>
							<Text style={styles.textDate}>
								{`${dateInfo.getDate()} ${months[dateInfo.getMonth()]} ${dateInfo.getFullYear()}`}
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.placeContainer}
						activeOpacity={0.7}
						onPress={() => this.showLocation()}>
						{/* <Icon name="map-marker" font="FontAwesome" size={30} /> */}
						<Image source={images.pin} resizeMode="contain" style={styles.icon} />
						<View style={{ paddingLeft: 5 }}>
							<Text style={styles.textPlace}>{address_ar}</Text>
							<Text style={styles.textPlaceAddress}>
								{address.length > 30 ? address.slice(0, 30) + "..." : address}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={[styles.detailsContainer, backgroundColor]}>
					<View style={[styles.textContainer]}>
						<Text style={styles.textType}>{type.toUpperCase()}</Text>
						<Text style={textTitle}>
							{title.length > lengthTitle
								? title.toUpperCase().slice(0, lengthTitle) + "..."
								: title.toUpperCase()}
						</Text>
					</View>
					<TouchableOpacity
						style={styles.bookButton}
						activeOpacity={0.7}
						onPress={() => this.bookNow()}>
						<Text style={styles.textBook}>BOOK</Text>
						<Text style={styles.textBook}>NOW</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: elementWidth,
		height: elementHeight,
		margin: elementMargin,
		elevation: 2,
		backgroundColor: colors.white,
		borderRadius: borderRadius
	},
	image: {
		flex: 3,
		height: imageHeight,
		width: elementWidth
	},
	dateContainer: {
		alignContent: "center",
		justifyContent: "center",
		width: dateWidth,
		height: dateHeight,
		position: "absolute",
		right: 0,
		top: 0
	},
	textDayNumber: {
		textAlign: "center",
		fontFamily: "TextaAltBold",
		lineHeight: fontSizes.large.xxxxl,
		fontSize: fontSizes.large.xxxxl,
		color: colors.white
	},
	textDayWeek: {
		textAlign: "center",
		color: colors.white,
		fontFamily: "DiodrumArabicSemibold",
		lineHeight: fontSizes.small.s,
		fontSize: fontSizes.small.s
	},
	infoContainer: {
		flex: 1,
		width: elementWidth,
		paddingLeft: elementWidth - detailsWidth,
		flexDirection: "row",
		alignItems: "flex-end"
	},
	icon: {
		width: iconWidth,
		height: iconHeight
	},
	timeContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		paddingBottom: 25
	},
	textTime: {
		textAlign: "left",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.xs,
		lineHeight: fontSizes.small.xs,
		color: colors.red,
		padding: 2
	},
	textDate: {
		textAlign: "left",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.xs,
		lineHeight: fontSizes.small.xs,
		padding: 2
	},
	placeContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		paddingBottom: 25
	},
	textPlace: {
		textAlign: "left",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.xs,
		lineHeight: fontSizes.small.xs,
		color: colors.red,
		padding: 2
	},
	textPlaceAddress: {
		textAlign: "left",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.xs,
		lineHeight: fontSizes.small.xs,
		padding: 2
	},

	detailsContainer: {
		width: detailsWidth,
		height: detailsHeight,
		flexDirection: "row",
		position: "absolute",
		backgroundColor: colors.white,
		right: 0,
		top: imageHeight - detailsHeight / 2
	},
	textContainer: {
		flex: 0.7,
		width: elementWidth,
		justifyContent: "space-around",
		padding: 10
	},
	textType: {
		fontFamily: "DiodrumArabic",
		fontStyle: "italic",
		fontSize: fontSizes.small.n,
		lineHeight: fontSizes.small.n,
		color: colors.white
	},
	textTitle: {
		textAlign: "left",
		fontWeight: "bold",
		fontStyle: "italic",
		fontFamily: "TextaAltBold",
		fontSize: fontSizes.medium,
		lineHeight: fontSizes.medium,
		color: colors.white
	},
	textTitleAr: {
		textAlign: "left",
		// fontWeight: "bold",
		// fontStyle: "italic",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.medium,
		lineHeight: fontSizes.medium,
		color: colors.white
	},
	textOrganizer: {
		textAlignVertical: "center",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.small.n,
		color: colors.white
		// fontWeight: "bold"
	},
	bookButton: {
		flex: 0.3,
		backgroundColor: colors.graySemiDark,
		justifyContent: "center"
	},
	textBook: {
		textAlign: "center",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.medium,
		lineHeight: fontSizes.medium,
		color: colors.white
	}
});
