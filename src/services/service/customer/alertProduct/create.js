import api, {ErrorAxios} from '../../../api';

const createAlertProduct = async post => {
  try {
    const {data: response} = await api.post(
      '/v2/customer-alert-product/alert-product/notification',
      post,
    );

    return response;
  } catch (err) {
    ErrorAxios(err, 'Fail createCustomer');
    return null;
  }
};

export default createAlertProduct;
