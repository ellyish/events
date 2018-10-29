import { monthName as monthsList } from "..";
const firebase = require("firebase");
require("firebase/firestore");
// import * as firebase from "firebase";
// import "firebase/firestore";

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
	// return;
	return (dispatch) => {
		dispatch({ type: GET_DATA });
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const db = firebase.firestore();
		const eventMonth = {};
		db.settings({ /* your settings... */ timestampsInSnapshots: true });
		db.collection("events")
			.orderBy("date")
			.get()
			.then((eventSnapshot) => {
				// console.log(querySnapshot.empty);
				// console.log(querySnapshot.docs);
				if (!eventSnapshot.empty) {
					// querySnapshot.forEach((doc) => {
					const eventsDocs = eventSnapshot.docs;
					for (const key in eventsDocs) {
						const event = eventsDocs[key];
						// console.log(doc);
						// console.log(doc.data());
						const data = event.data();
						data.id = event.id;
						const date = new Date(data.date);
						const dateLabel = `${monthsList[date.getMonth()]} ${date.getFullYear()}`;
						if (eventMonth[dateLabel]) {
							eventMonth[dateLabel].data.push(data);
						} else {
							eventMonth[dateLabel] = { dateLabel, data: [data] };
						}
					}
					// );
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
				}
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
			.orderBy("date")
			.get()
			.then((eventSnapshot) => {
				if (!eventSnapshot.empty) {
					// querySnapshot.forEach((doc) => {
					const eventsDocs = eventSnapshot.docs;
					for (const key in eventsDocs) {
						const event = eventsDocs[key];
						const data = event.data();
						data.id = event.id;
						const date = new Date(data.date);
						const dateLabel = `${monthsList[date.getMonth()]} ${date.getFullYear()}`;
						if (eventMonth[dateLabel]) {
							eventMonth[dateLabel].data.push(data);
						} else {
							eventMonth[dateLabel] = { dateLabel, data: [data] };
						}
					}
					// );
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
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};
}

export function rateEvents(eventId, userId, rating, comment) {
	return (dispatch) => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const db = firebase.firestore();
		db.settings({ /* your settings... */ timestampsInSnapshots: true });
		db.collection("ratings")
			.doc(eventId + userId)
			.set({
				userId,
				eventId,
				rating,
				comment,
				date: new Date()
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

export function attendsEvents(eventId, userId, location, barcode) {
	return (dispatch) => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const db = firebase.firestore();
		db.settings({ /* your settings... */ timestampsInSnapshots: true });
		db.collection("attending")
			.doc(eventId + userId)
			.set({
				eventId,
				userId,
				location,
				barcode,
				date: new Date()
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
