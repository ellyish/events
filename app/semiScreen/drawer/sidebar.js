import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SideEventItem from "./sideEventItem";
import { List } from "../../nativeComponents";
import { eventsDataSidebar } from "../../redux";
import { colors, fontSizes, images } from "../../theme";

import { logout } from "../../redux";

const { width, height } = Dimensions.get("window");
const sidebarImageWidth = width * 0.2;
const sidebarImageHeight = height * 0.65;
const sidebarImageTop = height * 0.05;
const sidebarLogoWidth = width * 0.2;
const sidebarLogoHeight = sidebarLogoWidth;
const sidebarLogoTop = height * 0.05;
const sidebarLogoLeft = width * 0.085;

class SideBar extends React.PureComponent {
	render() {
		let events = eventsDataSidebar.slice(0, 3);
		let action = eventsDataSidebar.slice(3, 5);
		if (this.props.isLogin) {
			action = [
				{
					name: "Logout",
					func: "logout"
				}
			];
		}
		return (
			<View style={styles.container}>
				<View bounces={false} style={{ flex: 0.2 }} />
				<Image
					resizeMode="cover"
					source={images.sidebarBackground}
					style={styles.backgroundImage}
				/>
				<View style={{ flex: 1.5 }}>
					<Image resizeMode="cover" source={images.logo} style={styles.logoImage} />
				</View>
				<View bounces={false} style={{ flex: 1.5 }}>
					<List style={styles.list} data={events} row={<SideEventItem />} />
					{/* <List style={styles.list} data={action} row={<SideEventItem />} /> */}
				</View>
				<View style={{ flex: 1 }}>
					<View style={styles.footer}>
						<View style={{ flex: 1 }}>
							{/* <Text style={[styles.text]}>&copy; 2018</Text>
							<Text style={[styles.text]}>Baghtivity</Text> */}
						</View>
						<View style={styles.developerContainer}>
							<View>
								{/* <Text style={[styles.textDevelopeTitle]}>designed</Text> */}
								<Text style={[styles.textDevelopeTitle]}>&copy; {new Date().getUTCFullYear()}</Text>
								<Text style={[styles.textSolo]}>CityFeed</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	backgroundImage: {
		width: sidebarImageWidth,
		height: sidebarImageHeight,
		position: "absolute",
		top: sidebarImageTop,
		left: 0
	},
	logoImage: {
		width: sidebarLogoWidth,
		height: sidebarLogoHeight,
		marginTop: sidebarLogoTop,
		marginLeft: sidebarLogoLeft
	},
	list: { flex: 1, paddingLeft: 25 },
	footer: {
		flex: 1,
		paddingLeft: 25,
		paddingTop: 10,
		paddingBottom: 15,
		justifyContent: "space-between"
	},
	text: {
		color: colors.black,
		fontFamily: "DiodrumArabicSemibold",
		textAlign: "left",
		writingDirection: "ltr",
		// fontWeight: "bold",
		fontSize: fontSizes.small.n
	},
	developerContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end"
	},
	textDevelopeTitle: {
		color: colors.black,
		fontFamily: "DiodrumArabicSemibold",
		textAlign: "left",
		writingDirection: "ltr",
		// fontWeight: "bold",
		fontSize: fontSizes.small.xs
	},
	textSolo: {
		// color: colors.red,
		fontFamily: "DiodrumArabicSemibold",
		textAlign: "left",
		writingDirection: "ltr",
		// fontWeight: "bold",
		fontSize: fontSizes.small.s
	}
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ logout }, dispatch);

const mapStateToProps = (state) => ({
	open: state.app.open,
	isLogin: state.user.isLogin
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideBar);
