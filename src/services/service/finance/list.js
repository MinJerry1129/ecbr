import api from '../../api';

const listTypePayments = async () => {
  try {
    const response = await api.get('/v2/finance/type-payments/');
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Type Payments List', err);
    return null;
  }
};

const listTypePaymentsCompanyDelivery = async companyDeliveryId => {
  try {
    const response = await api.get(
      `/v2/finance/type-payments/${companyDeliveryId}`,
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Fail Type Payments List', err);
    return null;
  }
};

export { listTypePayments, listTypePaymentsCompanyDelivery };
