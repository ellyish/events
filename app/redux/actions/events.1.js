import { monthName as monthsList } from "..";
import * as firebase from "firebase";

export const GET_EVENTS = "GET_EVENTS";
export const UP_COMING = "UP_COMING";
export const SET_PUSH_ID = "SET_PUSH_ID";
export const PAST_EVENTS = "PAST_EVENTS";
export const GET_DATA = "GET_DATA";
export const FINISHED = "FINISHED";

const firebaseConfig = {
	apiKey: "AIzaSyC2k-lE5QXT7YmK9HvuPzb3QslubDCMwdc",
	authDomain: "baghdad-activities.firebaseapp.com",
	databaseURL: "https://baghdad-activities.firebaseio.com",
	projectId: "baghdad-activities",
	storageBucket: "baghdad-activities.appspot.com",
	messagingSenderId: "326146412809"
};

export function getEvents() {
	return (dispatch) => {
		dispatch({ type: GET_DATA });
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const db = firebase.firestore();
		const eventMonth = {};
		db.settings({ /* your settings... */ timestampsInSnapshots: true });
		db.collection("events")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					data.id = doc.id;
					const date = new Date(data.date);
					const dateLabel = `${monthsList[date.getMonth()]} ${date.getFullYear()}`;
					if (eventMonth[dateLabel]) {
						eventMonth[dateLabel].data.push(data);
					} else {
						eventMonth[dateLabel] = { dateLabel, data: [data] };
					}
				});
				const events = [];
				for (const dateLabel in eventMonth) {
					if (eventMonth.hasOwnProperty(dateLabel)) {
						events.push({
							title: dateLabel,
							data: eventMonth[dateLabel].data
						});
					}
				}
				dispatch({
					type: GET_EVENTS,
					events
				});
				dispatch({ type: UP_COMING });
				dispatch({ type: FINISHED });
			})
			.catch((e) => {
				console.log(e);
			});
	};
}
export function updateEvents() {
	return (dispatch) => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const db = firebase.firestore();
		const eventMonth = {};
		db.settings({ /* your settings... */ timestampsInSnapshots: true });
		db.collection("events")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					data.id = doc.id;
					const date = new Date(data.date);
					const dateLabel = `${monthsList[date.getMonth()]} ${date.getFullYear()}`;
					if (eventMonth[dateLabel]) {
						eventMonth[dateLabel].data.push(data);
					} else {
						eventMonth[dateLabel] = { dateLabel, data: [data] };
					}
				});
				const events = [];
				for (const dateLabel in eventMonth) {
					if (eventMonth.hasOwnProperty(dateLabel)) {
						events.push({
							title: dateLabel,
							data: eventMonth[dateLabel].data
						});
					}
				}
				dispatch({
					type: GET_EVENTS,
					events
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};
}

export function addNotificationID(pushid, dispatch) {
	dispatch({
		type: SET_PUSH_ID,
		pushid
	});
	return (dispatch) => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const db = firebase.firestore();
		db.settings({ /* your settings... */ timestampsInSnapshots: true });
		db.collection("push")
			.where("pushid", "==", pushid)
			.get()
			.then((snapshot) => {
				if (snapshot.size == 0) {
					return db.collection("push").add({ pushid });
					// return db
					// 	.collection("push")
					// 	.doc(snapshot.docs[0].id)
					// 	.update({ pushid });
				}
			})
			.then((querySnapshot) => {
				// console.log(querySnapshot);
			})
			.catch((err, e) => {
				console.log(err);
				console.log(e);
			});
	};
}
export function rateEvents(eventID, pushid, rating) {
	return (dispatch) => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const db = firebase.firestore();
		db.settings({ /* your settings... */ timestampsInSnapshots: true });
		db.collection("ratings")
			.where("pushid", "==", pushid)
			.where("eventid", "==", `events/${eventID}`)
			.get()
			.then((snapshot) => {
				if (snapshot.size == 0) {
					return db.collection("ratings").add({ pushid, eventid: `events/${eventID}`, rating });
				}
				return db
					.collection("ratings")
					.doc(snapshot.docs[0].id)
					.update({ rating });
			})
			.then((querySnapshot) => {
				// console.log(querySnapshot);
			})
			.catch((err, e) => {
				console.log(err);
				console.log(e);
			});
	};
}
export function getUpcoming() {
	return (dispatch) => {
		dispatch({ type: UP_COMING });
	};
}
export function getPastEvent() {
	return (dispatch) => {
		dispatch({ type: PAST_EVENTS });
	};
}
