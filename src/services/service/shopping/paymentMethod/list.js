import api from '../../../api';
//import {queryString} from '../../../../../utils';

const listPaymentMethod = async customerId => {
  try {
    //const getQuery = queryString(params);
    const response = await api.get(`/shopping/payment-method/${customerId}`);
    const data = response.data;

    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail List customer PaymentMethod', err.response.data);
    } else {
      console.log('Fail List customer PaymentMethod', err);
    }

    return null;
  }
};

export {listPaymentMethod};
