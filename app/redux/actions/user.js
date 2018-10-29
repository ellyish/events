import { Permissions, Notifications } from "expo";
const firebase = require("firebase");
require("firebase/firestore");
// import * as firebase from "firebase";
// import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyC2k-lE5QXT7YmK9HvuPzb3QslubDCMwdc",
	authDomain: "baghdad-activities.firebaseapp.com",
	databaseURL: "https://baghdad-activities.firebaseio.com",
	projectId: "baghdad-activities",
	storageBucket: "baghdad-activities.appspot.com",
	messagingSenderId: "326146412809"
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const ATTENDING_EVENT = "ATTENDING_EVENT";

export function register(email, name, userId) {
	return (dispatch) => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const db = firebase.firestore();
		db.settings({ /* your settings... */ timestampsInSnapshots: true });
		db.collection("users")
			.doc(userId)
			.set({
				email,
				name,
				date: new Date()
			})
			.then((doc) => {
				// console.log(doc);
				dispatch({ type: REGISTER, name, email, userId });
			})
			.catch((err, e) => {
				console.log("error1", err);
				console.log("error2", e);
			});
	};
}
export function login(userId) {
	// return;
	return (dispatch) => {
		// console.log("LOGIN2", userId);
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const db = firebase.firestore();
		db.settings({ /* your settings... */ timestampsInSnapshots: true });
		db.collection("users")
			.doc(userId)
			.get()
			.then((doc) => {
				if (!doc.exists) {
					// console.log("No such users!", userId);
					dispatch({ type: LOGOUT, userId });
				} else {
					// console.log("users data:", doc.data());
					const { name, email } = doc.data();
					dispatch({ type: LOGIN, name, userId, email });
					db.collection("attending")
						.where("userId", "==", userId)
						.get()
						.then((doc) => {
							if (doc.empty) {
								// console.log("No such attending!", userId);
							} else {
								const attendingEvents = [];
								const attending = doc.docs;
								for (const key in attending) {
									const item = attending[key];
									attendingEvents.push(item.data());
								}
								dispatch({ type: ATTENDING_EVENT, attendingEvents });
							}
						})
						.catch((err, e) => {
							dispatch({ type: LOGIN, userId });
							console.log("error1", err);
							console.log("error2", e);
						});
				}
			})
			.catch((err, e) => {
				dispatch({ type: LOGIN, userId });
				console.log("error1", err);
				console.log("error2", e);
			});
	};
}

export function logout() {
	return (dispatch) => {
		dispatch({ type: LOGOUT });
	};
}
