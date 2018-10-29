import { StyleSheet } from "react-native";
import { colors, fontSizes } from "../theme";

export default StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(52, 52, 52, 0.5)"
	},
	container: {
		height: 175,
		elevation: 5,
		marginHorizontal: 50,
		backgroundColor: colors.blueCounter,
		borderRadius: 10
	},
	header: {
		flex: 1,
		justifyContent: "center",
		borderRadius: 10,
		backgroundColor: colors.blueCounter
	},
	textHeader: {
		color: colors.white,
		fontSize: fontSizes.medium,
		textAlign: "center"
	},
	body: {
		flex: 1.5,
		backgroundColor: colors.blueLightCounter
	},
	textInput: {
		flex: 1,
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: fontSizes.small.n,
		backgroundColor: colors.white,
		margin: 15,
		paddingHorizontal: 10,
		borderColor: colors.grayLight
	},
	footer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		borderRadius: 10
	},
	touchableButtomO: {
		flex: 1,
		borderLeftWidth: 1
	},
	touchableButtomC: {
		flex: 1,
		borderRightWidth: 1
	},
	textButtom: {
		flex: 1,
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: fontSizes.medium,
		color: colors.white,
		borderRadius: 10,
		backgroundColor: colors.blueCounter
	}
});
