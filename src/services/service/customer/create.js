import api, {ErrorAxios} from '../../api';
import {createLog} from '../Log';

const createCustomer = async post => {
  try {
    const response = await api.post('/customer/create', post);
    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    let errorData = ErrorAxios(err, 'Fail createCustomer');
    createLog({
      typeSystem: 'MOBILE',
      typeLog: 'ERROR',
      description: errorData,
      category: 'Create Customer',
      originError: 'screens-customer-newUser-index',
    });
    return null;
  }
};

export {createCustomer};
