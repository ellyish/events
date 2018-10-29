import { OPEN_DRAWER, CLOSE_DRAWER, TOGGLE_GRID, TOGGLE_SORT } from "../actions";

const initialState = { open: false, grid: false, sort: false };

const dataApp = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_DRAWER:
			state = Object.assign({}, state, { open: true });
			return state;
		case CLOSE_DRAWER:
			state = Object.assign({}, state, { open: false });
			return state;
		case TOGGLE_GRID:
			state = Object.assign({}, state, { grid: !state.grid });
			return state;
		case TOGGLE_SORT:
			state = Object.assign({}, state, { sort: !state.sort });
			return state;
		default:
			return state;
	}
};

export default dataApp;
