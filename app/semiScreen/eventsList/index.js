import React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "../../nativeComponents";
import { EventItem, EventLarge } from "../../components";

export default class EventsList extends React.Component {
	render() {
		// console.log("EventsList>>>>>>>>>");
		return (
			<View style={styles.container}>
				{this.props.grid ? (
					<List
						key="1"
						numColumns={1}
						row={<EventLarge />}
						data={this.props.item}
						onClick={(item) => {
							this.props.onClick(item);
						}}
					/>
				) : (
					<List
						key="2"
						numColumns={2}
						row={<EventItem />}
						data={this.props.item}
						onClick={(item) => {
							this.props.onClick(item);
						}}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({ container: { flex: 1, alignItems: "center" } });
