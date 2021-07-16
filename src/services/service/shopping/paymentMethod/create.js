import api from '../../../api';
var errCreatePaymentMethod = null;

const createPaymentMethod = async (customerId, post) => {
  try {
    errCreatePaymentMethod = null;

    const response = await api.post(
      `/shopping/payment-method/${customerId}/`,
      post,
    );

    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      const errData = err.response.data;
      //console.log('Fail Create customer PaymentMethod', errData);
      if (errData.message) {
        errCreatePaymentMethod = errData.message;
      } else {
        errCreatePaymentMethod = 'Não foi possível salvar informação';
      }
    } else {
      //console.log('Fail Create customer PaymentMethod', err);
      errCreatePaymentMethod = 'Não foi possível salvar informação';
    }

    return null;
  }
};

export {createPaymentMethod, errCreatePaymentMethod};
