import api from '../../../api';

const listOnePayment = async paymentId => {
  try {
    const response = await api.get(`payment/${paymentId}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail ListOne Payment', err);
    return null;
  }
};

const listPayCustomer = async customerId => {
  try {
    const response = await api.get(`payment/customer/${customerId}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail List Customer Payment', err);
    return null;
  }
};

const listPayCustomerActive = async (customerId, params) => {
  try {
    let response;
    if (params) {
      response = await api.get(
        `payment/customerActive/${customerId}?cartSuccess=${
          params.cartSuccess
        }`,
      );
    } else {
      response = await api.get(`payment/customerActive/${customerId}`);
    }
    const data = response.data;

    return data;
  } catch (err) {
    console.log('Fail List Customer Payment', err);
    return null;
  }
};

export {listOnePayment, listPayCustomer, listPayCustomerActive};
