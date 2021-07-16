import api from '../../api';
import {queryString} from '../../../utils';

const listTips = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/Tip/search?${getQuery}`);
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail Tips List', err);
    return null;
  }
};

export {listTips};
