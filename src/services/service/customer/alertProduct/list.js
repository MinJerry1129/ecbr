import api, {ErrorAxios} from '../../../api';
import {queryString} from '../../../../utils';

const listAlertProduct = async params => {
  try {
    const getQuery = queryString(params);

    const {data: response} = await api.get(
      `/v2/customer-alert-product/alert-product/notification?${getQuery}`,
    );

    return response;
  } catch (err) {
    ErrorAxios(err, 'Fail list alert product');
    return null;
  }
};

export default listAlertProduct;
