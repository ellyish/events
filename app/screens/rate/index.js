import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SubHeader } from "../../semiScreen";
import { RatingBar } from "../../nativeComponents";

import { colors, fontSizes } from "../../theme";

class Rating extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			invoice: [],
			getData: false,
			total: 0
		};
	}
	componentWillMount() {
		this.setState({
			total: 200,
			getData: true,
			modalVisible: false
		});
	}
	_valueChanged(value) {
		console.log(value);
	}
	render() {
		return (
			<View style={styles.container}>
				<SubHeader title={"Rate"} />
				<View style={styles.headContainer}>
					<Text style={styles.headText}>Please rate everything</Text>
				</View>
				<View style={styles.bodyContainer}>
					<Text style={styles.titleText}>Provide your feedback</Text>
					<Text style={styles.nameText}>For this event</Text>
					<View style={[styles.ratingRow, { paddingTop: 30 }]}>
						{/* <View style={styles.ratingContent}>
							<Text style={styles.ratingText}>Organization</Text>
						</View> */}
						<View style={styles.ratingContent}>
							<RatingBar
								maxStars={5}
								rating={1}
								selectStar={{ name: "star", font: "Entypo", size: 25 }}
								unSelectStar={{ name: "star", font: "EvilIcons", size: 25 }}
								iconStyle={styles.iconStyle}
								style={styles.ratingBar}
								valueChanged={this._valueChanged}
							/>
						</View>
					</View>
					{/* <View style={styles.ratingRow}>
						<View style={styles.ratingContent}>
							<Text style={styles.ratingText}>Food</Text>
						</View>
						<View style={styles.ratingContent}>
							<RatingBar
								maxStars={5}
								rating={1}
								selectStar={{ name: "star", font: "Entypo", size: 25 }}
								unSelectStar={{ name: "star", font: "EvilIcons", size: 25 }}
								iconStyle={styles.iconStyle}
								style={styles.ratingBar}
								valueChanged={this._valueChanged}
							/>
						</View>
					</View>
					<View style={styles.ratingRow}>
						<View style={styles.ratingContent}>
							<Text style={styles.ratingText}>Training</Text>
						</View>
						<View style={styles.ratingContent}>
							<RatingBar
								maxStars={5}
								rating={1}
								selectStar={{ name: "star", font: "Entypo", size: 25 }}
								unSelectStar={{ name: "star", font: "EvilIcons", size: 25 }}
								iconStyle={styles.iconStyle}
								style={styles.ratingBar}
								valueChanged={this._valueChanged}
							/>
						</View>
					</View>
					<View style={styles.ratingRow}>
						<View style={styles.ratingContent}>
							<Text style={styles.ratingText}>People</Text>
						</View>
						<View style={styles.ratingContent}>
							<RatingBar
								maxStars={5}
								rating={1}
								selectStar={{ name: "star", font: "Entypo", size: 25 }}
								unSelectStar={{ name: "star", font: "EvilIcons", size: 25 }}
								iconStyle={styles.iconStyle}
								style={styles.ratingBar}
								valueChanged={this._valueChanged}
							/>
						</View>
					</View> */}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headContainer: {
		backgroundColor: colors.redLight,
		justifyContent: "center",
		alignContent: "center"
	},
	headText: {
		color: colors.white,
		textAlign: "center",
		padding: 5
	},
	bodyContainer: {
		flex: 1,
		backgroundColor: colors.white10,
		padding: 10,
		paddingTop: 20
	},
	titleText: {
		fontSize: fontSizes.medium,
		fontFamily: "DiodrumArabicSemibold",
		// fontWeight: "bold"
	},
	nameText: { fontFamily: "DiodrumArabicSemibold", fontSize: fontSizes.small.n },
	ratingRow: {
		flexDirection: "row",
		paddingRight: 50,
		alignContent: "center"
	},
	ratingContent: {
		flex: 1,
		justifyContent: "center"
	},
	ratingText: { textAlign: "left" },
	ratingBar: { color: colors.white },
	iconStyle: {
		color: colors.maron,
		padding: 2
	}
});

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getInvoices, openAddToCart, removeFromInvoices } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch);
};

const mapStateToProps = (state) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Rating);
