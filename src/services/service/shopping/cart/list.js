import api from '../../../api';
import {queryString} from '../../../../utils';

const listCart = async (customerId, companyId, params) => {
  try {
    const getQuery = queryString(params);

    if (companyId === null) {
      companyId = '';
    } else {
      companyId = `/${companyId}`;
    }

    const response = await api.get(
      `/shopping/cart/${customerId}${companyId}?${getQuery}`,
    );
    const data = response.data;

    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail Cart List', err.response.data);
    } else {
      console.log('Fail Cart List', err);
    }

    return null;
  }
};

const cartCurrent = async (cartId, params) => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(
      `shopping/cart/current/${cartId}?${getQuery}`,
    );
    const data = response.data;
    return data;
  } catch (err) {
    return [];
  }
};

export {listCart, cartCurrent};
