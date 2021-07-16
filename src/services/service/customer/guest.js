import api, {ErrorAxios} from '../../api';

const createGuest = async post => {
  try {
    const response = await api.post('/customer/guest', post);
    const data = response.data;
    return data;
  } catch (err) {
    ErrorAxios(err, 'Fail createCustomer');
    return null;
  }
};

const listOneGuest = async deviceId => {
  try {
    const response = await api.get(`/customer/guest/${deviceId}`);
    const data = response.data;
    return data;
  } catch (err) {
    ErrorAxios(err, 'Fail createCustomer');
    return null;
  }
};

export default createGuest;
export {createGuest, listOneGuest};
