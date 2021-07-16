import api from '../../../api';
import {queryString} from '../../../../utils';

const listDeliveryAddress = async () => {
  try {
    const response = await api.get('/customer/delivery-address/list');
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail listDeliveryAddress', err);
    return null;
  }
};

const seacrhDeliveryAddress = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(
      `/customer/delivery-address/search?${getQuery}`,
    );
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail seacrhDeliveryAddress', err.response.data);
    } else {
      console.log('Fail seacrhDeliveryAddress', err);
    }
    return null;
  }
};

export {listDeliveryAddress, seacrhDeliveryAddress};
