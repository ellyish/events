import React from "react";
import { RefreshControl, FlatList, View, Text } from "react-native";
import { Loading, Message } from "../";

export class List extends React.PureComponent {
	state = {
		refreshing: false,
		selectedIndex: 0
	};

	onRefresh() {
		setTimeout(() => {
			this.setState({ refreshing: false });
		}, 5000);
	}

	onSelected(selectedIndex) {
		this.setState({ selectedIndex });
	}

	_onScroll(e) {}

	render() {
		const {
			data,
			getData,
			style,
			noDataMessage,
			message,
			refreshControl,
			numColumns,
			onClick,
			containerStyle,
			horizontal,
			selectable,
			isDragable
		} = this.props;
		let selectData = {};
		if (selectable) {
			selectData = {
				onSelected: this.onSelected.bind(this),
				selectedIndex: this.state.selectedIndex
			};
		}
		const { refreshing } = this.state;
		if (getData) return <Loading />;
		else if (data)
			if (data.length == 0)
				if (noDataMessage)
					return React.cloneElement(noDataMessage, {
						refreshing,
						onRefresh: this.onRefresh.bind(this)
					});
				else
					return (
						<Message
							isDragable={isDragable}
							message={message || "No data in this branch"}
							refreshing={refreshing}
							onRefresh={this.onRefresh.bind(this)}
						/>
					);
			else {
				return (
					<FlatList
						style={style}
						removeClippedSubviews
						contentContainerStyle={containerStyle}
						showsVerticalScrollIndicator={false}
						horizontal={horizontal}
						numColumns={numColumns || 1}
						data={data}
						initialNumToRender={6}
						extraData={this.state}
						keyExtractor={(item, index) => "list" + index}
						renderItem={(dataRow) =>
							React.cloneElement(this.props.row, { onClick, ...selectData, ...dataRow })
						}
						refreshControl={
							refreshControl ? (
								<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
							) : null
						}
					/>
				);
			}
		return <View {...this.props} />;
	}
}
