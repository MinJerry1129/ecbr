import api from '../../api';
import {queryString} from '../../../utils';

const listCategories = async companyId => {
  try {
    let params = {};
    params.isPaused = true;
    params.hideItens = true;
    let getQuery = queryString(params);

    const response = await api.get(`food/category/${companyId}?${getQuery}`);
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

export {listCategories};
