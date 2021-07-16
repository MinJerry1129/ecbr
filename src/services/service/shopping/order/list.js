import api from '../../../api';
import {queryString} from '../../../../utils';

const listOrderOne = async (paymentId, params = {}) => {
  try {
    const getQuery = queryString(params);

    const response = await api.get(`/order/payment/${paymentId}?${getQuery}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail List OrderOne', err);
    return null;
  }
};

const listOrderCustomer = async customer => {
  try {
    const response = await api.get(`/order/customerHaveOrder/${customer}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail List OrderOne Customer', err);
    return null;
  }
};

const currentOrder = async (orderId, params = {}) => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(
      `/order/current-order/${orderId}?${getQuery}`,
    );
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail List OrderOne', err);
    return null;
  }
};

const getOrderDelivery = async (orderId, params = {}) => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(
      `/order/delivery/information/${orderId}?${getQuery}`,
    );

    const data = response.data;
    return data;
  } catch (err) {
    return null;
  }
};

export {listOrderOne, listOrderCustomer, currentOrder, getOrderDelivery};
