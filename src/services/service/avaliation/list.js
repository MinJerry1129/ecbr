import api from '../../api';
import {queryString} from '../../../utils';

const listAvaliationSearch = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/avaliation/search?${getQuery}`);
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail avaliation List', err);
    return null;
  }
};

export {listAvaliationSearch};
