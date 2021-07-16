import api from '../../../api';

const updateDeliveryAddress = async (id, post) => {
  try {
    const response = await api.put(
      `/customer/delivery-address/update/${id}`,
      post,
    );

    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    console.log('Fail Address Update', err);
    return null;
  }
};

export {updateDeliveryAddress};
