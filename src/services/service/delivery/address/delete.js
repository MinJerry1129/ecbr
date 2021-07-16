import api from '../../../api';

const deleteDeliveryAddress = async id => {
  try {
    const response = await api.delete(
      `/customer/delivery-address/delete/${id}`,
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Customer List', err);
    return null;
  }
};

export {deleteDeliveryAddress};
