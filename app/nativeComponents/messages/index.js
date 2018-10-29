import React from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, fontSizes } from "../theme";

export class Message extends React.PureComponent {
	onRefresh() {
		if (__DEV__) {
			// console.log("Start");
			setTimeout(() => {
				// console.log("End");
			}, 2000);
		} else {
			this.props.onRefresh();
		}
	}
	render() {
		let {
			refreshing = false,
			message = "No mssage",
			isDragable = false,
			position = "center",
			style
		} = this.props;
		return (
			<ScrollView
				flexGrow={1}
				contentContainerStyle={styles.messagesContainer}
				refreshControl={
					isDragable ? <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} /> : null
				}>
				<View style={styles[position + "Message"]}>
					<Text style={[styles.textMessage, { color: colors.grey.aa500 }, style]}>{message}</Text>
					{isDragable ? <Text style={[styles.textMessage, style]}>Drag to reload</Text> : null}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	messagesContainer: {
		flex: 1,
		flexDirection: "row"
	},
	centerMessage: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	topMessage: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center"
	},
	bottomMessage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end"
	},
	textMessage: {
		fontSize: fontSizes.medium,
		color: colors.grey.aa500,
		textAlign: "center"
	}
});
