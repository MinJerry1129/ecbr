import {GET_SERVICE_CHARGE} from '../actions/actionTypes';

const initialState = {
  value: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICE_CHARGE:
      return {...state, value: action.payload};
    default:
      return state;
  }
};

export default reducer;
