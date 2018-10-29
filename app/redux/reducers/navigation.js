import { NavigationActions } from "react-navigation";
import { NAVIGATE, BACK, REPLACE, openDrawer, closeDrawer } from "../actions";

import { RootNavigator as AppNavigator } from "../../AppNavigator";

const firstAction = AppNavigator.router.getActionForPathAndParams("main");
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export default (state = initialNavState, action) => {
	let nextState;
	let { index, routes } = state;
	switch (action.type) {
		case NAVIGATE:
			nextState = AppNavigator.router.getStateForAction(
				NavigationActions.navigate({
					routeName: action.screenName,
					params: { ...action.params }
				}),
				state
			);
			break;
		case BACK:
			nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
			break;
		default:
			nextState = AppNavigator.router.getStateForAction(action, state);
			break;
	}

	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state;
};
