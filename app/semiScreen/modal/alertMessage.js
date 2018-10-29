import React from "react";
import { Modal, Text, TouchableHighlight, View, TextInput, StyleSheet } from "react-native";
import { colors, fontSizes } from "../../theme";

class AlertMessage extends React.Component {
	state = { count: 1 };
	addToCart = (count) => {
		console.log("addToCart");
	};
	openCounter = () => {
		console.log("show");
	};

	render() {
		const countShow = this.state.count ? this.state.count : 1;
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.show}
				onShow={this.openCounter}
				onRequestClose={() => {
					this.props.hide(false);
				}}>
				<View style={styles.main}>
					<View style={styles.container}>
						<View style={styles.header}>
							<Text style={styles.textHeader}>Number of Items</Text>
						</View>
						<View style={styles.body}>
							<TextInput
								style={styles.textInput}
								underlineColorAndroid={colors.transparent}
								onChangeText={(count) =>
									this.setState({ count: parseInt(count) ? parseInt(count) : 0 })
								}
								keyboardType="numeric"
								value={`${countShow}`}
							/>
						</View>
						<View style={styles.footer}>
							<TouchableHighlight
								underlayColor={colors.blueLight}
								style={styles.touchableButtonC}
								onPress={() => {
									this.setState({ count: 1 });
									this.props.hide(false);
								}}>
								<Text style={styles.textButton}>Cancel</Text>
							</TouchableHighlight>
							<TouchableHighlight
								underlayColor={colors.blueLight}
								style={styles.touchableButtomO}
								onPress={() => {
									this.addToCart(countShow);
								}}>
								<Text style={styles.textButton}>OK</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
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
	touchableButtonC: {
		flex: 1,
		borderRightWidth: 1
	},
	textButton: {
		flex: 1,
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: fontSizes.medium,
		color: colors.white,
		borderRadius: 10,
		backgroundColor: colors.blueCounter
	}
});

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { openDrawer, closeDrawer, back } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ openDrawer, closeDrawer, back }, dispatch);
};

const mapStateToProps = (state) => ({
	navigation: state.navigation,
	isDrawerOpen: state.app.open
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage);
