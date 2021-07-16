import api from '../../../api';

const deletePaymentMethod = async id => {
  try {
    const response = await api.delete(`/shopping/payment-method/${id}/`);

    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    console.log('Error deletePaymentMethod', err.response.data);
    return null;
  }
};

export {deletePaymentMethod};
