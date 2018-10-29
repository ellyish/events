import React from "react";
import { View, StyleSheet, ScrollView, Animated } from "react-native";
import PropTypes from "prop-types";
import { Image } from "../";
// import DotBar from "./dotBar";
// import ImageViewer from "./imageViewer";
export * from "./dotBar";
export * from "./imageViewer";

const BANNER = "banner";
const IMAGES = "images";
const IMAGE_VIEWER = "imageViewer";

const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

export class SliderImages extends React.Component {
	animVal = new Animated.Value(0);
	state = { width: 0 };

	createSlide({ styleImage, placeholder, resizeMode = "contain", items = false, type = "images" }) {
		if (!items) return;
		this.imageArray = [];
		this.barArray = [];
		this.numItems = items.length;
		const style = [{ width: this.state.width }, styles.image, styleImage];
		items.forEach((item, key) => {
			this.imageArray.push(this.renderRow(type, { item, key, resizeMode, placeholder, style }));
			if (this.numItems > 1) {
				this.barArray.push(
					<DotBar
						key={`bar${key}`}
						index={key}
						radius={3}
						elementWidth={this.state.width}
						scrollBarVal={this.animVal}
						numItems={this.numItems}
						barWidth={FIXED_BAR_WIDTH}
						barSpace={BAR_SPACE}
					/>
				);
			}
		});
	}

	renderRow(type, props) {
		switch (type) {
			case IMAGE_VIEWER:
				return <ImageViewer source={{ uri: props.item }} {...props} />;
			case IMAGES:
				return <Image source={{ uri: props.item }} {...props} />;
			default:
				return React.cloneElement(this.props.slide, props);
		}
	}

	render() {
		this.createSlide(this.props);
		return (
			<View style={[{ flex: 1 }, this.props.style]}>
				<View style={styles.container}>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						scrollEventThrottle={10}
						style={styles.imageScroll}
						contentContainerStyle={styles.imageContainer}
						pagingEnabled
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }])}
						onLayout={(event) => this.setState({ width: event.nativeEvent.layout.width })}>
						{this.imageArray}
					</ScrollView>
					<View style={styles.dotBarContainer}>{this.barArray}</View>
				</View>
			</View>
		);
	}

	static propTypes = {
		resizeMode: PropTypes.oneOf(["contain", "cover", "stretch"]),
		type: PropTypes.oneOf([BANNER, IMAGE_VIEWER, IMAGES]),
		items: PropTypes.array || PropTypes.object,
		placeholder: PropTypes.any
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center"
	},
	imageScroll: { flexDirection: "row" },
	imageContainer: {},
	image: { flex: 1 },
	dotBarContainer: {
		flexDirection: "row",
		position: "absolute",
		bottom: 20
	}
});
