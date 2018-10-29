export const NAVIGATE = "NAVIGATE";
export const BACK = "BACK";
export const REPLACE = "REPLACE";

export function navigate(screenName, params) {
	return (dispatch) => {
		dispatch({ type: NAVIGATE, screenName, params });
	};
}

export function back(screenName = null) {
	return (dispatch) => {
		dispatch({ type: BACK, screenName });
	};
}
export function replace(screenName) {
	return (dispatch) => {
		dispatch({ type: REPLACE, screenName });
	};
}
