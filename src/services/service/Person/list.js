import api from '../../api';
import {queryString} from '../../../utils';

const listPersonOne = async (personId, params) => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/person/${personId}?${getQuery}`);
    const data = response.data;
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail Person ListOne', err.response.data);
    } else {
      console.log('Fail Person ListOne', err);
    }

    return null;
  }
};

const listPersonSearch = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/person/search?${getQuery}`);
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail person List', err.response.data);
    return null;
  }
};

export {listPersonOne, listPersonSearch};
