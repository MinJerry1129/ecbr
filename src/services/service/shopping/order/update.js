import api from '../../../api';

const updateStatusOrder = async (statusOrderId, post) => {
  try {
    const response = await api.put(`/order/status/${statusOrderId}/`, post);
    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    console.log('Error update StatusOrder', err.response.data);
    return null;
  }
};

export {updateStatusOrder};
