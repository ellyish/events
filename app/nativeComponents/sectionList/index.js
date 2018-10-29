import React from "react";
import { RefreshControl, SectionList, View } from "react-native";
import { Loading, Message } from "../";

export class ListSection extends React.PureComponent {
	state = {
		refreshing: false,
		selectedIndex: 0
	};

	onRefresh() {
		this.props.onRefresh();
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
			loading,
			style,
			noDataMessage,
			message,
			refreshControl,
			numColumns,
			onClick,
			containerStyle,
			horizontal,
			selectable,
			isDragable,
			grid
		} = this.props;
		let selectData = {};
		if (selectable) {
			selectData = {
				onSelected: this.onSelected.bind(this),
				selectedIndex: this.state.selectedIndex
			};
		}
		const { refreshing } = this.state;
		if (getData) return <Loading {...loading} />;
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
				let sectionData = data;
				if (numColumns > 1) {
					sectionData = [];
					data.forEach(({ title, data }) => {
						let temparray = [];
						for (let i = 0, j = data.length; i < j; i += numColumns) {
							temparray.push(data.slice(i, i + numColumns));
							// do whatever
						}
						sectionData.push({
							title,
							data: temparray
						});
					});
				}
				return (
					<SectionList
						style={style}
						snapToAlignment={"center"}
						removeClippedSubviews
						contentContainerStyle={containerStyle}
						showsVerticalScrollIndicator={false}
						horizontal={horizontal}
						sections={sectionData}
						extraData={this.state}
						keyExtractor={(item, index) => "sectionList" + index}
						renderSectionHeader={(dataRow) =>
							React.cloneElement(this.props.section, { ...dataRow })
						}
						renderItem={(dataRow) =>
							Array.isArray(dataRow.item) ? (
								<View style={{ flexDirection: "row" }}>
									{dataRow.item.map((item, index) =>
										React.cloneElement(this.props.row, { onClick, grid, ...selectData, item })
									)}
								</View>
							) : (
								React.cloneElement(this.props.row, { onClick, grid, ...selectData, ...dataRow })
							)
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
