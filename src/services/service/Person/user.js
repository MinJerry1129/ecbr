import api from '../../api';
import {queryString} from '../../../utils';

const listUserOne = async (userId, params) => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/user/${userId}?${getQuery}`);
    const data = response.data;
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail listUserOne', err.response.data);
    } else {
      console.log('Fail listUserOne', err);
    }

    return null;
  }
};

export {listUserOne};
