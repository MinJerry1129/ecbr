import api, {ErrorAxios} from '../../api';
import {queryString} from '../../../utils';

const listSlider = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`slider/list?${getQuery}`);
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    ErrorAxios(err, 'Fail Slider List');
    return null;
  }
};

export {listSlider};
