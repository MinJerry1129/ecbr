import api from '../../../api';
import {createLog} from '../../../service/Log';

const createCartItem = async (cartId, productId, post) => {
  try {
    const response = await api.post(
      `/shopping/cart-item/${cartId}/${productId}`,
      post,
    );

    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    // if (err.response && err.response.data) {
    //   await createLog({
    //     typeSystem: 'MOBILE',
    //     typeLog: 'ERROR',
    //     description: err,
    //     category: 'Create Cart',
    //     originError: 'services-service-shopping-cartItem-create',
    //   });
    //   return err.response.data;
    // }
    return null;
  }
};

export {createCartItem};
