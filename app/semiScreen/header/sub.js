import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "../../nativeComponents";
import styles from "./style";

class SubHeader extends Component {
	render() {
		let { title, back } = this.props;
		return (
			<View style={styles.header}>
				<View style={styles.left}>
					<TouchableOpacity onPress={back}>
						<Icon name="keyboard-backspace" font="MaterialCommunityIcons" style={styles.icon} />
					</TouchableOpacity>
				</View>
				<View style={styles.body}>
					<Text style={styles.title}>{title}</Text>
				</View>
				<View style={styles.right} />
			</View>
		);
	}
}
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { back } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ back }, dispatch);
};

const mapStateToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubHeader);
