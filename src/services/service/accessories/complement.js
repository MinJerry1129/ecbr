import api from '../../api';
import { queryString } from '../../../utils';

const listComplement = async idProduct => {
  try {
    let params = {};
    params.isPaused = true;
    let getQuery = queryString(params);

    const response = await api.get(
      `v2/accessories/product-complement/${idProduct}?${getQuery}`,
    );
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail Product Complement', err);
    return null;
  }
};

export { listComplement };
