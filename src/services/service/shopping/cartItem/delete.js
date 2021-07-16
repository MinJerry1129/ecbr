import api from '../../../api';

const deleteCartItem = async (cartId, cartItemId) => {
  try {
    const response = await api.delete(
      `/shopping/cart-item/${cartId}/${cartItemId}`,
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Delete CartItem', err.response.data);
    return null;
  }
};

export {deleteCartItem};
