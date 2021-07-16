import api from '../../api';
import { queryString } from '../../../utils';

const listProduct = async (params = {}) => {
  try {
    params.isPaused = true;
    params.hideItens = true;
    let getQuery = queryString(params);

    const response = await api.get(`food/product?${getQuery}`);
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail Product List', err);
    return null;
  }
};

const listProductGroupCategory = async (params = {}) => {
  try {
    params.isPaused = true;
    params.hideItens = true;
    let getQuery = queryString(params);

    const response = await api.get(`/v2/food/product?${getQuery}`);
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail Product List', err);
    return null;
  }
};

const listOne = async id => {
  try {
    const response = await api.get(`food/product/${id}`);
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Product List', err);
    return null;
  }
};

export { listProduct, listProductGroupCategory, listOne };
