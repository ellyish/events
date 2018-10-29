import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { LinearGradient } from "expo";
import { Icon } from "../../nativeComponents";
import { colors } from "../../theme";

export class InputText extends React.Component {
	state = {};
	render() {
		const { gStart, gMiddle, gEnd } = colors;
		return (
			<LinearGradient colors={[gStart, gMiddle, gEnd]} start={[0, 1]} end={[1, 0]}>
				<View style={styles.input}>
					<Icon style={styles.icon} size={30} font={"EvilIcons"} name={"search"} />
					<TextInput
						style={styles.inputText}
						underlineColorAndroid="transparent"
						placeholder={"اكتب اسم المنتج"}
						onChangeText={(text) => {
							console.log(text);
						}}
					/>
					<Icon style={styles.icon} size={30} font={"MaterialIcons"} name={"mic"} />
				</View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		margin: 10,
		padding: 5,
		flexDirection: "row",
		borderRadius: 3,
		elevation: 5,
		shadowColor: colors.black,
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		},
		borderColor: colors.blueLight,
		backgroundColor: colors.white
	},
	icon: { paddingLeft: 8 },
	inputText: {
		flex: 1,
		textAlign: "left"
	}
});
