import api from '../../api';
import {queryString} from '../../../utils';

const listFilter = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`application/category?${getQuery}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail Filter List', err);
    return null;
  }
};

export {listFilter};
