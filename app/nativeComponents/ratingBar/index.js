import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "../";

export class RatingBar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			containerLayout: {
				height: -1,
				width: -1
			},
			maxStars: this.props.maxStars,
			rating: this.props.rating,
			layout: {
				height: -1,
				width: -1
			}
		};
		this._onLayout = this._onLayout.bind(this);
		this._onResponderMove = this._onResponderMove.bind(this);
		this._onResponderGrant = this._onResponderGrant.bind(this);
	}

	render() {
		let starArray = [],
			icon;
		const { selectStar, unSelectStar, starSize, style, iconStyle } = this.props;
		const { maxStars, rating, starWidth } = this.state;
		for (let i = 0; i < maxStars; i++) {
			if (i < rating) icon = selectStar;
			else icon = unSelectStar;
			let onLayoutFunc = null;
			if (i === 0) onLayoutFunc = this._onLayout;
			starArray.push(<Icon key={i} pointerEvents="none" {...icon} style={iconStyle} />);
		}
		return (
			<View>
				<View onLayout={this._onLayout} style={[styles.container, style]}>
					{starArray}
				</View>
				<View
					style={[
						styles.container,
						{
							position: "absolute",
							zIndex: 10,
							right: 0,
							top: 0,
							width: this.state.containerLayout.width,
							height: this.state.containerLayout.height
						}
					]}
					onStartShouldSetResponder={() => true}
					onMoveShouldSetResponder={() => true}
					onResponderGrant={this._onResponderGrant}
					onResponderMove={this._onResponderMove}
				/>
			</View>
		);
	}

	_onLayout({ nativeEvent: { layout } }) {
		if (this.state.starWidth > 0) {
			this.setState({ containerLayout: layout });
		} else {
			this.setState({
				containerLayout: layout,
				starWidth: layout.width
			});
		}
	}

	_onResponderGrant(evt) {
		this._updateChangeValue(evt);
	}

	_onResponderMove(evt) {
		this._updateChangeValue(evt);
	}

	_updateChangeValue({ nativeEvent }) {
		var rating = Math.ceil(
			(this.props.maxStars * nativeEvent.locationX) / this.state.containerLayout.width
		);
		if (rating < 0) {
			rating = 0;
		} else if (rating > this.state.maxStars) {
			rating = this.state.maxStars;
		}
		this.setState({ rating: rating });
		this.props.valueChanged(rating);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	}
});
