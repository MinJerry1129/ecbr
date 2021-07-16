import api from '../../../api';
import {createLog} from '../../../service/Log';

const createCart = async (customerId, companyId, post) => {
  try {
    const response = await api.post(
      `/shopping/cart/${customerId}/${companyId}`,
      post,
    );
    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      return {status: false, error: err.response.data.error};
    }

    logError(err);
    return null;
  }
};

const logError = err => {
  createLog({
    typeSystem: 'MOBILE',
    typeLog: 'ERROR',
    description: err,
    category: 'Create Cart',
    originError: 'services-service-shopping-cart-create',
  });
};

export {createCart};
