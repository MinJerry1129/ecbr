import {
  GET_TO_CART,
  ADD_TO_CART,
  CLEAN_TO_CART,
  LOAD_TO_CART,
  ADD_TO_CART_RESTAURANT,
  MESSAGE_TO_CART,
} from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
  totalItens: 0,
  subTotal: 0,
  subTotalNormal: 0,
  serviceCharge: 0,
  deliveryFee: 0,
  cart: [],
  company: null,
  status: null,
  shoppingCart: null,
  loading: false,
  messageError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TO_CART:
      return getCartCompany(action);
    case ADD_TO_CART:
      return addToCart(state, action);
    case ADD_TO_CART_RESTAURANT:
      return addToCartRestaurant(state, action);
    case CLEAN_TO_CART:
      return cleanCart(state, action);
    case LOAD_TO_CART:
      return load(state, action);
    case MESSAGE_TO_CART:
      return messageErrorCart(state, action);
    default:
      return state;
  }
};

const getCartCompany = action => {
  return {
    cart: action.payload.cart,
    totalItens: action.payload.totalItens ? action.payload.totalItens : 0,
    subTotal: action.payload.subTotal ? action.payload.subTotal : 0,
    subTotalNormal: action.payload.subTotalNormal
      ? action.payload.subTotalNormal
      : 0,
    serviceCharge: action.payload.serviceCharge
      ? action.payload.serviceCharge
      : 0,
    deliveryFee: action.payload.deliveryFee ? action.payload.deliveryFee : 0,
    loading: false,
    messageError: null,
  };
};

const addToCart = (state, action) => {
  return produce(state, draft => {
    draft.cart = action.payload.cart;
    draft.totalItens = action.payload.totalItens
      ? action.payload.totalItens
      : 0;
    draft.subTotal = action.payload.subTotal ? action.payload.subTotal : 0;
    draft.subTotalNormal = action.payload.subTotalNormal
      ? action.payload.subTotalNormal
      : 0;
    draft.serviceCharge = action.payload.serviceCharge
      ? action.payload.serviceCharge
      : 0;
    draft.deliveryFee = action.payload.deliveryFee
      ? action.payload.deliveryFee
      : 0;
    draft.loading = false;
    draft.messageError = null;
  });
};

const addToCartRestaurant = (state, action) => {
  return produce(state, draft => {
    draft.cart = action.payload;
  });
};

const cleanCart = (state, action) => {
  return produce(state, draft => {
    draft.cart = [];
    draft.messageError = null;
  });
};

const load = (state, action) => {
  return {
    ...state,
    loading: action.payload,
  };
};

const messageErrorCart = (state, action) => {
  return produce(state, draft => {
    draft.messageError = action.payload;
    return draft;
  });
};

export default reducer;
