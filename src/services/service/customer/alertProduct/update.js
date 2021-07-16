import api, {ErrorAxios} from '../../../api';

const updateAlertProduct = async (alertId, body) => {
  try {
    const {data: response} = await api.put(
      `/v2/customer-alert-product/alert-product/notification/${alertId}`,
      body,
    );

    return response;
  } catch (err) {
    ErrorAxios(err, 'Fail update alert product');
    return null;
  }
};

export default updateAlertProduct;
