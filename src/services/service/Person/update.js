import api from '../../api';

const updatePersonOne = async (personId, body) => {
  try {
    const response = await api.put(`/person/${personId}`, body);
    const data = response.data;
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail Person update', err.response.data);
    } else {
      console.log('Fail Person update', err);
    }

    return null;
  }
};

export {updatePersonOne};
