import { OPEN_ADD_TO_CART, OPEN_ALERT_MESSAGE, CLOSE_MODAL } from "../actions";

const initialState = {
	message: { open: false },
	cart: { open: false }
};

const dataModal = (state = initialState, action) => {
	const { data } = action;
	switch (action.type) {
		case OPEN_ADD_TO_CART:
			const cart = { open: true, ...data };
			state = Object.assign({}, initialState, { cart });
			return state;
		case OPEN_ADD_TO_CART:
			const message = { open: true, ...data };
			state = Object.assign({}, initialState, { message });
			return state;
		case CLOSE_MODAL:
			return initialState;
		default:
			return state;
	}
};

export default dataModal;
