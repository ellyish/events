import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../theme";

const platform = Platform.OS;
const { width } = Dimensions.get("window");
const size = 100;
const { white } = colors;
export const gradient = [white, white, white];
export default StyleSheet.create({
	container: {},
	header: {
		height: platform === "ios" ? 64 : 56,
		width: width,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white,
		elevation: 5
	},
	tranHeader: {
		height: platform === "ios" ? 64 : 56,
		width: width,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.transparent
	},
	left: { flexDirection: "row", padding: 20 },
	body: { flex: 1 },
	right: { flexDirection: "row", padding: 20 },
	iconContainer: {
		paddingVertical: 15
	},
	icon: {
		color: colors.black,
		paddingHorizontal: 5,
		fontSize: platform === "ios" ? 20 : 22
	},
	title: {
		color: colors.black,
		fontFamily: "DiodrumArabicSemibold",
		textAlign: "left",
		// fontWeight: "bold",
		fontSize: platform === "ios" ? 17 : 19
	},
	tabs: {
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 0,
		elevation: 0
	},
	tabsUnderline: { backgroundColor: colors.transparent },
	tabScroll: {
		backgroundColor: colors.blueLight,
		borderBottomWidth: 0
	},
	tab: { backgroundColor: colors.blueLight },
	tabsActive: {
		borderBottomWidth: 3,
		borderBottomColor: colors.white,
		backgroundColor: colors.blueLight
	},
	textTabs: { fontFamily: "DiodrumArabicSemibold", color: colors.white },
	textTabsActive: {
		fontFamily: "DiodrumArabicSemibold",
		color: colors.white
		// fontWeight: "bold"
	},
	mainApp: {
		width: size,
		height: size,
		borderRadius: size / 2,
		borderWidth: 3,
		borderColor: colors.white
	},
	fab: { backgroundColor: colors.blue }
});
