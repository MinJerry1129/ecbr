import api from '../../api';

const updateRead = async (personId, cartId) => {
  try {
    const response = await api.put('/chat/read', {
      read: true,
      personId: personId,
      cartId: cartId,
    });
    const data = response.data;
    return data;
  } catch (err) {
    return null;
  }
};

export {updateRead};
