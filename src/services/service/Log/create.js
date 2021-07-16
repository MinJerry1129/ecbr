import api from '../../api';

const createLog = async post => {
  try {
    const response = await api.post('/log/create', post);
    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    console.log('Fail Log Create', err);
    return null;
  }
};

export {createLog};
