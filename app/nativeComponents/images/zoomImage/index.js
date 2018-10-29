import React, { Component } from "react";
import { View, PanResponder, Image } from "react-native";

function maxOffset(offset, windowDimension, imageDimension) {
	let max = windowDimension - imageDimension;
	if (max >= 0) return 0;
	return offset < max ? max : offset;
}

const DOUBLE_PRESS_DELAY = 300;

export class ZoomableImage extends Component {
	constructor(props) {
		super(props);

		this._onLayout = this._onLayout.bind(this);

		this.state = {
			zoom: null,
			minZoom: null,
			layoutKnown: false,
			isZooming: false,
			isMoving: false,
			initialDistance: null,
			initialX: null,
			initalY: null,
			offsetTop: 0,
			offsetLeft: 0,
			initialTop: 0,
			initialLeft: 0,
			initialTopWithoutZoom: 0,
			initialLeftWithoutZoom: 0,
			initialZoom: 1,
			top: 0,
			left: 0,
			imageWidth: 500,
			imageHeight: 500
		};
	}

	processTouch(x, y) {
		if (!this.state.isZoom) return;
		if (!this.state.isMoving) {
			this.setState({
				isMoving: true,
				initialX: x,
				initialY: y,
				initialTop: this.state.top,
				initialLeft: this.state.left
			});
		} else {
			let left = this.state.initialLeft + x - this.state.initialX;
			let top = this.state.initialTop + y - this.state.initialY;

			this.setState({
				left:
					left > 0
						? 0
						: maxOffset(left, this.state.width, this.state.imageWidth * this.state.zoomWidth),
				top:
					top > 0
						? 0
						: maxOffset(top, this.state.height, this.state.imageHeight * this.state.zoomHeight)
			});
		}
	}

	_onLayout(event) {
		let { width, height } = event.nativeEvent.layout;
		if (width === this.state.width && height === this.state.height) return;

		Image.getSize(this.props.source.uri, (imageWidth, imageHeight) => {
			let zoom = 1 / this.props.zoom;
			// let zoomWidth = imageWidth / layout.width;
			// let zoomHeight = imageHeight / layout.height;
			let zW = imageWidth / width > zoom ? zoom : imageWidth / width;
			let zH = imageHeight / height > zoom ? zoom : imageHeight / height;
			let zoomWidth = zW > zH ? (zH > 0.5 ? 0.5 : zH) : zW > 0.5 ? 0.5 : zW;
			let zoomHeight = (zoomWidth * height) / width;
			// console.log("Zoom", zoomWidth);
			let offsetTop =
				height > this.props.imageHeight * zoomHeight
					? (height - this.props.imageHeight * zoomHeight) / 2
					: 0;
			let offsetLeft =
				width > this.props.imageWidth * zoomWidth
					? (width - this.props.imageWidth * zoomWidth) / 2
					: 0;

			this.setState({
				rotate: imageHeight < imageWidth,
				layoutKnown: true,
				width: width,
				height: height,
				// zoom: zoom,
				zoomWidth: zoomWidth,
				zoomHeight: zoomHeight,
				offsetTop: offsetTop,
				offsetLeft: offsetLeft,
				imageWidth: imageWidth,
				imageHeight: imageHeight
				// minZoom: zoom
			});
		});
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: (evt, gestureState) => {
				this.handleImagePress();
			},
			onPanResponderMove: (evt, gestureState) => {
				let touches = evt.nativeEvent.touches;
				if (touches.length == 2) {
					let touch1 = touches[0];
					let touch2 = touches[1];
					this.processPinch(touches[0].pageX, touches[0].pageY, touches[1].pageX, touches[1].pageY);
				} else if (touches.length == 1 && !this.state.isZooming) {
					if (this.state.rotate) this.processTouch(touches[0].pageY, -touches[0].pageX);
					else this.processTouch(touches[0].pageX, touches[0].pageY);
				}
			},
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: (evt, gestureState) => {
				this.setState({
					isZooming: false,
					isMoving: false
				});
			},
			onPanResponderTerminate: (evt, gestureState) => {},
			onShouldBlockNativeResponder: (evt, gestureState) => true
		});
	}

	handleImagePress(e) {
		const now = new Date().getTime();
		if (this.lastImagePress && now - this.lastImagePress < DOUBLE_PRESS_DELAY) {
			delete this.lastImagePress;
			this.handleImageDoublePress(e);
		} else this.lastImagePress = now;
	}

	handleImageDoublePress(e) {
		console.log("double press activated!");
		this.setState({ isZoom: !this.state.isZoom });
	}

	render() {
		const { source, style, resizeMode } = this.props;
		let rotate = this.state.rotate ? [{ rotate: "90deg" }] : undefined;
		return (
			<View
				style={style}
				transform={rotate}
				{...this._panResponder.panHandlers}
				onLayout={this._onLayout}>
				{this.state.isZoom ? (
					<Image
						style={[
							{
								position: "absolute",
								top: this.state.offsetTop + this.state.top,
								left: this.state.offsetLeft + this.state.left,
								width: this.state.imageWidth * this.state.zoomWidth,
								height: this.state.imageHeight * this.state.zoomHeight
							}
						]}
						source={source}
					/>
				) : (
					<Image resizeMode={resizeMode} style={{ flex: 1 }} source={source} />
				)}
			</View>
		);
	}
}

// ZoomableImage.propTypes = {
// 	imageWidth: PropTypes.number.isRequired,
// 	imageHeight: PropTypes.number.isRequired,
// 	source: PropTypes.object.isRequired
// };
export default ZoomableImage;
