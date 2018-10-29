import React from "react";
import { Text, StyleSheet, TouchableOpacity, Platform, Linking } from "react-native";
import { colors, fontSizes } from "../../theme";

const platform = Platform.OS;

class SideEventItem extends React.PureComponent {
	onClick(func) {
		switch (func) {
			case "getPastEvent":
				this.props.getPastEvent();
				break;
			case "getUpcoming":
				this.props.getUpcoming();
				break;
			case "logout":
				this.props.logout();
				break;
			case "login":
			case "register":
				this.props.navigate(func);
				break;
			case "addEvent":
				const url = "http://www.baghtivity.net/submit";
				Linking.canOpenURL(url)
					.then((supported) => {
						if (supported) {
							Linking.openURL(url);
						} else {
							console.log("Don't know how to open URI: " + url);
						}
					})
					.catch((e) => {
						console.log("Error ", e);
					});
				break;
		}
	}
	render() {
		const { item } = this.props;
		return (
			<TouchableOpacity style={styles.listItem} onPress={() => this.onClick(item.func)}>
				<Text style={[styles.text]}>{item.name}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	listItem: {
		flexDirection: "row",
		marginLeft: 0,
		padding: 5
	},
	text: {
		color: colors.black,
		fontFamily: "TextaAltBold",
		textAlign: "left",
		writingDirection: "ltr",
		// fontWeight: "bold",
		fontSize: fontSizes.small.n
	}
});

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPastEvent, getUpcoming, navigate } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getPastEvent, getUpcoming, navigate }, dispatch);
};

const mapStateToProps = (state) => ({
	isLogin: state.user.isLogin
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideEventItem);
