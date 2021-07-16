import api from '../../../api';
import {queryString} from '../../../../utils';

const listCartItem = async (cartId, params) => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/shopping/cart-item/${cartId}?${getQuery}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail CartItem List', err);
    return null;
  }
};

const getCartItem = async foodId => {
  try {
    const response = await api.get(`/shopping/food-product/${foodId}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail CartItem List', err);
    return null;
  }
};

export {listCartItem, getCartItem};
