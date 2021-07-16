import api from '../../api';

const listSetting = async () => {
  try {
    const response = await api.get('/global/settings');
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Global Settings', err);
    return null;
  }
};

export {listSetting};
