import api, {ErrorAxios} from '../../api';
import {queryString} from '../../../utils';

const searchCompanyProduct = async params => {
  try {
    const getQuery = queryString(params);
    // console.log('ulr', `/v1/search/company-products?${getQuery}`);
    const response = await api.get(`/v1/search/company-products?${getQuery}`);
    const data = response.data;

    return data;
  } catch (err) {
    ErrorAxios(err, 'Fail searchCompanyProduct');
    return null;
  }
};

export default searchCompanyProduct;
