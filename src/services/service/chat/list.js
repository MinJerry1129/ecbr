import api from '../../api';
import {queryString} from '../../../utils';

const listChat = async params => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(`/chat?${getQuery}`);
    const data = response.data;
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail listChat', err.response.data);
    } else {
      console.log('Fail listChat', err);
    }

    return null;
  }
};

const totalNoRead = async (cartId, params) => {
  try {
    const getQuery = queryString(params);
    const response = await api.get(
      `/chat/message/total/no-read/${cartId}?${getQuery}`,
    );
    const data = response.data;
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail listChat', err.response.data);
    } else {
      console.log('Fail listChat', err);
    }

    return null;
  }
};

export {listChat, totalNoRead};
