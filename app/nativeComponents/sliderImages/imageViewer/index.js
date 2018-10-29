import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import ShowImageNative from "./showImage";
import { Image } from "../../";

export const showImage = ShowImageNative;
export class ImageViewer extends React.PureComponent {
	state = { visible: false };
	showImage(visible) {
		this.setState({ visible });
	}
	render() {
		const { source, placeholder, style } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.4}
				style={[styles.container, style]}
				onPress={() => {
					this.showImage(true);
				}}>
				<ShowImageNative
					visible={this.state.visible}
					hide={this.showImage.bind(this)}
					source={source}
				/>
				<Image {...this.props} defaultSource={placeholder} style={styles.image} />
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	image: { flex: 1 }
});
