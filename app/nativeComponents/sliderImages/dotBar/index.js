import React from "react";
import { Animated, View, Dimensions, StyleSheet } from "react-native";
import { colors } from "../../theme";
const deviceWidth = Dimensions.get("window").width;

export class DotBar extends React.PureComponent {
	render() {
		let { barWidth, barSpace, numItems, index: i, scrollBarVal, elementWidth } = this.props;
		let dimensions = {
			height: this.props.radius * 2,
			width: this.props.radius * 2,
			borderRadius: this.props.radius
		};
		const itemWidth = barWidth / numItems - (numItems - 1) * barSpace;
		let scrollBar = scrollBarVal.interpolate({
			inputRange: [
				(elementWidth ? elementWidth : deviceWidth) * (i - 1),
				(elementWidth ? elementWidth : deviceWidth) * (i + 1)
			],
			outputRange: [-itemWidth, itemWidth],
			extrapolate: "clamp"
		});
		return (
			<View
				style={[
					styles.track,
					dimensions,
					{ marginLeft: this.props.index === 0 ? 0 : this.props.barSpace }
				]}>
				<Animated.View
					style={[styles.bar, dimensions, { transform: [{ translateX: scrollBar }] }]}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	track: {
		backgroundColor: colors.white,
		overflow: "hidden"
	},
	bar: {
		backgroundColor: colors.blue.a200,
		position: "absolute",
		left: 0,
		top: 0
	}
});
