import api from '../../api';

const updateCustomer = async (id, post) => {
  try {
    const response = await api.put(`/customer/update/${id}`, post);
    const data = response.data;

    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    console.log('Fail Customer Update', err);
    console.log(id, post);
    return false;
  }
};

export {updateCustomer};
