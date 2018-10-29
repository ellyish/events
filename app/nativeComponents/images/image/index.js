import React from "react";
import { View, Image as ImageRN, Animated, StyleSheet } from "react-native";

export class Image extends React.PureComponent {
	thumbnailOpacity = new Animated.Value(1);

	onLoad(delay = 250) {
		Animated.timing(this.thumbnailOpacity, {
			toValue: 0,
			duration: delay
		}).start();
	}

	render() {
		let { style, source, resizeMode, placeholder, placeholderResizeMode, delay } = this.props;
		const dimensions = { width: style.width, height: style.height };
		return (
			<View style={style}>
				<ImageRN
					source={source}
					resizeMode={resizeMode}
					style={[styles.image, dimensions]}
					onLoad={(event) => this.onLoad(delay, event)}
				/>
				<Animated.Image
					source={placeholder}
					resizeMode={placeholderResizeMode || resizeMode || "stretch"}
					style={[styles.placeholder, dimensions, { opacity: this.thumbnailOpacity }]}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	placeholder: {
		flex: 1,
		alignSelf: "center"
	}
});
