import React, { Component } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo";
import { Icon } from "../../nativeComponents";
import styles, { gradient } from "./style";

class TransHeader extends Component {
	search = () => {
		console.log("search");
	};
	sort = () => {
		console.log("sort");
	};
	back = () => {
		this.props.back();
	};

	render() {
		let { openDrawer, showSort, title, showSearch } = this.props;
		return (
			<View style={styles.tranHeader}>
				<View style={styles.left}>
					<TouchableOpacity style={styles.iconContainer} onPress={this.back}>
						<Icon name="keyboard-backspace" font="MaterialCommunityIcons" style={styles.icon} />
					</TouchableOpacity>
				</View>
				<View style={styles.body} />
				<View style={styles.right}>{this.props.right}</View>
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

const mapStateToProps = (state) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TransHeader);
