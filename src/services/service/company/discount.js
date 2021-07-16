import api, {ErrorAxios} from '../../api';
import {queryString} from '../../../utils';

const discountRestaurant = async params => {
  try {
    const getQuery = queryString(params);
    const {data: response} = await api.get(
      `/v1/food/discount-restaurant/?${getQuery}`,
    );
    return response;
  } catch (err) {
    ErrorAxios(err, 'Fail searchCompanyProduct');
    return null;
  }
};

export {discountRestaurant};
