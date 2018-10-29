import React from "react";
import { View, StyleSheet } from "react-native";

import { MainHeader, Events } from "../../semiScreen";
import { colors } from "../../theme";

export default class Main extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<MainHeader showSearch title="Upcoming" />
				<View style={styles.container}>
					<View style={{ flex: 1 }}>
						<Events navigate={null} />
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: colors.mainBackground
	}
});
