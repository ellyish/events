import React from "react";
import { Modal, Text, TouchableHighlight, View, TextInput, StyleSheet } from "react-native";
import { colors, fontSizes } from "../../theme";

class AddToCart extends React.Component {
	state = { count: 1 };
	addToCart = () => {
		const item = this.props.item;
		item.count = this.state.count;
		this.props.addToInvoices(item);
	};

	render() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.showModal}
				onShow={() => {
					this.setState({ count: 1 });
				}}
				onRequestClose={this.props.closeModal}>
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
								value={`${this.state.count}`}
							/>
						</View>
						<View style={styles.footer}>
							<TouchableHighlight
								underlayColor={colors.blueLight}
								style={styles.touchableButtonC}
								onPress={this.props.closeModal}>
								<Text style={styles.textButton}>Cancel</Text>
							</TouchableHighlight>
							<TouchableHighlight
								underlayColor={colors.blueLight}
								style={styles.touchableButtonO}
								onPress={this.addToCart}>
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
		backgroundColor: colors.transparentLight
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
	touchableButtonO: {
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
import { closeModal, openAddToCart, addToInvoices } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ closeModal, openAddToCart, addToInvoices }, dispatch);
};

const mapStateToProps = (state) => ({
	showModal: state.modal.cart.open,
	item: state.modal.cart
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
