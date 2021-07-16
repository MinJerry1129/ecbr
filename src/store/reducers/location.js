import {LOCATION, GET_LOCATION} from '../actions/actionTypes';

const initialState = {
  coords: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        coords: action.payload,
      };
    case LOCATION:
      return state;
    default:
      return state;
  }
};

export default reducer;
