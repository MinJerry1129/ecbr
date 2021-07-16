import api from '../../../api';

const listTypesPayment = async () => {
  try {
    //const getQuery = queryString(params);
    const response = await api.get('/finance/type-payments');
    const data = response.data;

    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log('Fail List listTypesPayment', err.response.data);
    } else {
      console.log('Fail List listTypesPayment', err);
    }

    return null;
  }
};

export {listTypesPayment};
