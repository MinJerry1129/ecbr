import api from '../../api';

const createChatImage = async params => {
  try {
    const response = await api.post('/chat/image', params);
    const data = response.data;
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail createChatImage', err.response.data);
    } else {
      console.log('Fail createChatImage', err);
    }

    console.log('Error All createChatImage', err);
    return null;
  }
};

export {createChatImage};
