import api from '../../../api';

const updateCartItem = async (cartId, cartItemId, post) => {
  try {
    const response = await api.put(
      `/shopping/cart-item/${cartId}/${cartItemId}`,
      post,
    );

    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    console.log('Fail CartItem Update', err);
    return null;
  }
};

export {updateCartItem};
