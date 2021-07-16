import api from '../../api';

const listPopups = async person => {
  try {
    const response = await api.get(`/tools/popup/listPopupApp/${person}`);
    const data = response.data;

    if (data && data.list) {
      return data.list;
    }

    return data;
  } catch (err) {
    console.log('Fail Popup List', err);
    return null;
  }
};

export {listPopups};
