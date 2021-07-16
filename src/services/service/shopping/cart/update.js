import api from '../../../api';

const updateCart = async (cartId, post) => {
  try {
    const response = await api.put(`/shopping/cart/${cartId}`, post);
    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    console.log('Fail Cart Update', err);
    return null;
  }
};

export {updateCart};
