import {
  GET_EVENTS, UP_COMING, PAST_EVENTS, FINISHED, GET_DATA, SET_PUSH_ID,
} from '../actions';
import { eventsTestData } from '../data';

const initialState = {
  events: eventsTestData, upcoming: true, getData: false, pushid: '',
};

const dataEvents = (state = initialState, action) => {
  const { events, pushid } = action;
  // console.log(action);
  switch (action.type) {
    case GET_EVENTS:
      state = Object.assign({}, state, { events });
      return state;
    case SET_PUSH_ID:
      state = Object.assign({}, state, { pushid });
      return state;
    case UP_COMING:
      state = Object.assign({}, state, { upcoming: true });
      return state;
    case GET_DATA:
      state = Object.assign({}, state, { getData: true });
      return state;
    case FINISHED:
      state = Object.assign({}, state, { getData: false });
      return state;
    case PAST_EVENTS:
      state = Object.assign({}, state, { upcoming: false });
      return state;
    default:
      return state;
  }
};

export default dataEvents;
