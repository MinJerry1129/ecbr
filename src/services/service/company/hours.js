import api from '../../api';

const listHours = async company => {
  let response = null;
  try {
    response = await api.get(`company/hours/${company}`);
    const data = response.data;
    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail Hours Company', err, response);
    return null;
  }
};

export { listHours };
