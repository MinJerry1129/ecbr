import api from '../../api';

const listGroup = async () => {
  try {
    const response = await api.get('/group/list');
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail Group List', err);
    return null;
  }
};

export {listGroup};
