import React from "react";
import { StyleSheet, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ListSection } from "../../nativeComponents";
import { EventItem, EventLarge, EventSection } from "../../components";
import { getEvents, updateEvents, navigate } from "../../redux";
import colors from "../../theme/colors";

const sortByDate = (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime();
const sortByName = (a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0);

class Events extends React.Component {
	componentDidMount() {
		this.props.getEvents();
	}

	render() {
		const { upcoming, events, getData, updateEvents, sortAlpha } = this.props;
		const eventsData = [];
		const today = new Date().getTime();
		events.forEach((event) => {
			const filtered = event.data.filter(
				({ date }) =>
					upcoming ? new Date(date).getTime() >= today : new Date(date).getTime() < today
			);
			if (filtered.length > 0) {
				eventsData.push({
					data: filtered.sort(sortAlpha ? sortByName : sortByDate),
					title: event.title
				});
			}
		});
		return (
			<View style={styles.container}>
				<ListSection
					section={<EventSection />}
					getData={getData}
					loading={{ position: "center", color: colors.graySemiDark }}
					isDragable
					numColumns={this.props.grid ? 2 : 1}
					refreshControl
					onRefresh={updateEvents}
					row={this.props.grid ? <EventItem /> : <EventLarge />}
					containerStyle={{ alignItems: "flex-start", paddingBottom: 15 }}
					data={eventsData}
					onClick={(item) => {
						this.props.navigate("event", { item });
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({ container: { flex: 1, alignItems: "center" } });

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ getEvents, updateEvents, navigate }, dispatch);

const mapStateToProps = (state) => ({
	events: state.events.events,
	upcoming: state.events.upcoming,
	getData: state.events.getData,
	grid: state.app.grid,
	sortAlpha: state.app.sort
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Events);
