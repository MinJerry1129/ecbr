import api, {ErrorAxios} from '../../api';
import {queryString} from '../../../utils';

const listProduct = async company => {
  try {
    const response = await api.get(`/product/company/${company}`);
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

const listSearchProduct = async (company, word, limit, page) => {
  try {
    const response = await api.get(
      `/product/search/${company}?word=${word}&limit=${limit}&page=${page}`,
    );
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail Product List', err);
    return null;
  }
};

const listProductOffer = async (company, params) => {
  try {
    const getQuery = queryString(params);

    const response = await api.get(
      `/product/company/offer/${company}?${getQuery}`,
    );
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
    const response = await api.get(`product/list/${id}`);
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Product List', err);
    return null;
  }
};

const listAll = async (params = {}) => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`product/list?${getQuery}`);
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Product List', err);
    return null;
  }
};

const relatedProduct = async (params = {}) => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`product/related?${getQuery}`);
    const data = response.data;
    return data;
  } catch (err) {
    ErrorAxios(err, 'Fail relatedProduct');
    return null;
  }
};

export {
  listProduct,
  listOne,
  listAll,
  listProductOffer,
  listSearchProduct,
  relatedProduct,
};
