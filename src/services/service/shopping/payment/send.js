import api from '../../../api';
var errSendPayment = null;
var errPayload = null;

const sendPayment = async (cartId, post) => {
  try {
    errSendPayment = null;
    const response = await api.post(`/payment/send/cart/${cartId}`, post);

    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      const errData = err.response.data;
      errPayload = errData;

      if (errData.message) {
        errSendPayment = errData.message;
      } else {
        errSendPayment = 'Não foi possível salvar informação';
      }
    } else {
      errSendPayment = 'Não foi possível salvar informação';
    }

    return null;
  }
};

const sendPaymentCard = async (cartId, post) => {
  try {
    errSendPayment = null;
    const response = await api.post(
      `/v2/payment/card-machine/send/cart/${cartId}`,
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
      errPayload = errData;

      if (errData.message) {
        errSendPayment = errData.message;
      } else {
        errSendPayment = 'Não foi possível salvar informação';
      }
    } else {
      errSendPayment = 'Não foi possível salvar informação';
    }

    return null;
  }
};

const sendPaymentMoney = async (cartId, post) => {
  try {
    errSendPayment = null;
    const response = await api.post(
      `/v2/payment/money/send/cart/${cartId}`,
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
      errPayload = errData;

      if (errData.message) {
        errSendPayment = errData.message;
      } else {
        errSendPayment = 'Não foi possível salvar informação';
      }
    } else {
      errSendPayment = 'Não foi possível salvar informação';
    }

    return null;
  }
};

export {
  sendPayment,
  sendPaymentCard,
  sendPaymentMoney,
  errSendPayment,
  errPayload,
};
