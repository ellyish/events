import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { colors, fontSizes } from "../../../theme";

const { width } = Dimensions.get("window");

export class EventSection extends React.PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{this.props.section.title.toUpperCase()}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: width,
		padding: 10,
		// paddingLeft: 15,
		paddingBottom: 0
	},
	text: {
		textAlign: "left",
		fontFamily: "DiodrumArabicSemibold",
		fontSize: fontSizes.large.n,
		color: colors.black
	}
});
