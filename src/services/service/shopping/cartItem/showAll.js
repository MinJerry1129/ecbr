import api, {ErrorAxios} from '../../../api';
import {queryString} from '../../../../utils';

const showAllCart = async (cartId, params = {}) => {
  try {
    const getQuery = queryString(params);

    const {data: response} = await api.get(
      `/shopping/cart-item/show-all/${cartId}?${getQuery}`,
    );

    return response;
  } catch (err) {
    ErrorAxios(err, 'Fail searchCompanyProduct');
    return null;
  }
};

export default showAllCart;
