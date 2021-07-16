import api, {ErrorAxios} from '../../../api';
import {createLog} from '../../Log';

const createDeliveryAddress = async post => {
  try {
    const response = await api.post('/customer/delivery-address/create', post);
    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    let errorData = ErrorAxios(err, 'createDeliveryAddress');
    createLog({
      typeSystem: 'MOBILE',
      typeLog: 'ERROR',
      description: errorData,
      category: 'Create Address',
      originError: 'components-customer-Address-confirmAddress',
    });
    return null;
  }
};

export {createDeliveryAddress};
