import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import locationReducer from './reducers/location';
import cartReducer from './reducers/cart';
import serviceCharge from './reducers/serviceCharge';

const reducers = combineReducers({
  user: userReducer,
  location: locationReducer,
  cart: cartReducer,
  serviceCharge: serviceCharge,
});

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)));
};

export default storeConfig;
