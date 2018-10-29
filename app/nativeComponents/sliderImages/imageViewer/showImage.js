import React from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { ZoomableImage } from "../../";
import { colors } from "../../../theme";

export const ShowImage = ShowImageNative;
export default class ShowImageNative extends React.PureComponent {
	render() {
		let { source, visible, hide } = this.props;
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={visible}
				onRequestClose={() => {
					hide(false);
				}}>
				<TouchableWithoutFeedback>
					<View style={styles.main}>
						<View style={styles.containerImage}>
							<ZoomableImage resizeMode="contain" style={styles.image} source={source} zoom={3} />
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "transparent"
	},
	containerImage: {
		height: 350,
		elevation: 40,
		margin: 30,
		borderRadius: 10
	},
	image: {
		height: 350,
		backgroundColor: "gray",
		padding: 0
	}
});
