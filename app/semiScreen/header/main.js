import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "../../nativeComponents";
import styles from "./style";

class Main extends PureComponent {
	render() {
		const {
			openDrawer,
			title,
			showSearch,
			upcoming,
			grid,
			toggleGrid,
			sortAlpha,
			toggleSort
		} = this.props;
		return (
			<View style={styles.header}>
				<View style={styles.left}>
					<TouchableOpacity onPress={openDrawer}>
						<Icon name={"menu"} font="Feather" style={styles.icon} />
					</TouchableOpacity>
				</View>
				<View style={styles.body}>
					<Text style={styles.title}>{upcoming ? title : "Past"}</Text>
				</View>
				{showSearch ? (
					<View style={styles.right}>
						<TouchableOpacity onPress={toggleSort}>
							{sortAlpha ? (
								<Icon name="sort-alpha-asc" font="FontAwesome" style={styles.icon} />
							) : (
								<Icon name="sort-numeric-asc" font="FontAwesome" style={styles.icon} />
							)}
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleGrid}>
							{grid ? (
								<Icon name="grid" font="Entypo" style={styles.icon} />
							) : (
								<Icon name="grid-large" font="MaterialCommunityIcons" style={styles.icon} />
							)}
						</TouchableOpacity>
					</View>
				) : null}
			</View>
		);
	}
}

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { openDrawer, toggleGrid, toggleSort } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ openDrawer, toggleGrid, toggleSort }, dispatch);
};

const mapStateToProps = (state) => ({
	open: state.app.open,
	grid: state.app.grid,
	sortAlpha: state.app.sort,
	isLogin: state.user.login,
	upcoming: state.events.upcoming
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
