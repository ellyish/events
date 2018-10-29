import { LOGIN, LOGOUT, REGISTER, ATTENDING_EVENT } from "../actions";

let initialState = { isLogin: false, name: "", userId: "", email: "", attendingEvents: [] };

const dataUser = (
	state = initialState,
	{ type, name = "", userId = "", email = "", attendingEvents = [] }
) => {
	switch (type) {
		case LOGIN:
		case REGISTER:
			state = Object.assign({}, state, { isLogin: true, name, userId, email });
			return state;
		case LOGOUT:
			state = Object.assign({}, state, { isLogin: false, name, userId, email });
			return state;
		case ATTENDING_EVENT:
			state = Object.assign({}, state, { attendingEvents });
			return state;
		default:
			return state;
	}
};

export default dataUser;
