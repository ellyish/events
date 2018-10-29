export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";
export const TOGGLE_GRID = "TOGGLE_GRID";
export const TOGGLE_SORT = "TOGGLE_SORT";

export function openDrawer() {
	return (dispatch) => {
		dispatch({ type: OPEN_DRAWER });
	};
}

export function closeDrawer() {
	return (dispatch) => {
		dispatch({ type: CLOSE_DRAWER });
	};
}

export function toggleGrid() {
	return (dispatch) => {
		dispatch({ type: TOGGLE_GRID });
	};
}

export function toggleSort() {
	return (dispatch) => {
		dispatch({ type: TOGGLE_SORT });
	};
}
