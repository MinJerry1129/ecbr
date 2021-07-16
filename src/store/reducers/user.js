import {GET_USER, GET_ADDRESS} from '../actions/actionTypes';

const initialState = {
  load: false,
  user: null,
  addres: null,
  location: null,
  guest: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action?.payload?.user,
        guest: action?.payload?.guest,
      };
    case GET_ADDRESS:
      let result = {};
      if (action && action.payload && action.payload.length) {
        result = action.payload[0];
      } else {
        result = action.payload;
      }

      let address = '';

      if (result && result.addressRoute) {
        address = `${result.addressRoute}`;
        if (`${result.number || ''}`.length > 0) {
          address += `, ${result.number}`;
        }
      } else if (result && result.addressRegion) {
        address = `${result.addressRegion}`;
      }

      if (result && result.address && address === '') {
        address = result?.address;
      }

      return {
        ...state,
        user: action.user,
        addres: address,
        location: result?.location,
      };
    default:
      return state;
  }
};

export default reducer;
