import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const SIZE = {
	tiny: 20,
	small: 50,
	medium: 75,
	large: 150
};

export class Loading extends React.PureComponent {
	render() {
		const { style, size, position, color } = this.props;
		return (
			<View style={[styles[position || "center"], style]}>
				<ActivityIndicator animating={true} color={color} size={SIZE[size || "medium"]} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	top: {
		alignItems: "center",
		justifyContent: "center"
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	bottom: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end"
	}
});
