import api from '../../../api';

const updatePaymentMethod = async (id, post) => {
  try {
    const response = await api.put(`/shopping/payment-method/${id}/`, post);

    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    console.log('Error updatePaymentMethod', err.response.data);
    return null;
  }
};

export {updatePaymentMethod};
