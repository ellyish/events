export const OPEN_ADD_TO_CART = "OPEN_ADD_TO_CART";
export const OPEN_ALERT_MESSAGE = "OPEN_ALERT_MESSAGE";
export const CLOSE_MODAL = "CLOSE_MODAL";

export function openAddToCart(data) {
	return (dispatch) => {
		dispatch({ type: OPEN_ADD_TO_CART, data });
	};
}
export function openAlertMessage(data) {
	return (dispatch) => {
		dispatch({ type: OPEN_ALERT_MESSAGE, data });
	};
}

export function closeModal() {
	return (dispatch) => {
		dispatch({ type: CLOSE_MODAL });
	};
}
