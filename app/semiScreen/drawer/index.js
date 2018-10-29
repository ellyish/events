import React from "react";
import { Dimensions } from "react-native";
import Drawer from "react-native-drawer";
import { colors } from "../../theme";
import SideBar from "./sidebar";

const { width } = Dimensions.get("window");

class MyDrawer extends React.PureComponent {
	render() {
		let { open, closeDrawer, children } = this.props;
		return (
			<Drawer
				content={<SideBar />}
				open={open}
				type="overlay"
				openDrawerOffset={width / 2}
				styles={{
					drawer: {
						shadowColor: "black",
						shadowOpacity: 0.8,
						elevation: 16,
						shadowRadius: 150
					},
					mainOverlay: {
						shadowColor: colors.black,
						shadowOpacity: 0.8,
						shadowRadius: 3
					}
				}}
				elevation={2}
				tweenHandler={Drawer.tweenPresets.easeInOutQuad}
				tweenDuration={250}
				tapToClose={true}
				tweenEasing={"easeInOutQuad"}
				onClose={closeDrawer}>
				{children}
			</Drawer>
		);
	}
}

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { openDrawer, closeDrawer } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ openDrawer, closeDrawer }, dispatch);
};

const mapStateToProps = (state) => ({ open: state.app.open });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyDrawer);
