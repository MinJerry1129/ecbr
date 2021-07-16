import api from '../../api';
import {queryString} from '../../../utils';

const customerCurrent = async id => {
  try {
    const response = await api.get(`/customer/list/${id}`);
    const data = response.data;
    return data;
  } catch (err) {
    return null;
  }
};

const listCustomer = async () => {
  try {
    const response = await api.get('/customer/list');
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Customer List', err);
    return null;
  }
};

const listCustomerSearch = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/customer/search?${getQuery}`);
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Customer List', err);
    return null;
  }
};

export {listCustomer, listCustomerSearch, customerCurrent};
