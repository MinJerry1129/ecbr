import api from '../../api';
import {queryString} from '../../../utils';

const listShopperSearch = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/shopper/search?${getQuery}`);
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail shopper List', err);
    return null;
  }
};

export {listShopperSearch};
