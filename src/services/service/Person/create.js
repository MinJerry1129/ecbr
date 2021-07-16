import api, {ErrorAxios} from '../../api';
import {createLog} from '../Log';

const createPerson = async body => {
  try {
    const response = await api.post('/person', body);
    const data = response.data;

    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    let errorData = ErrorAxios(err, 'Fail createPerson');
    createLog({
      typeSystem: 'MOBILE',
      typeLog: 'ERROR',
      description: errorData,
      category: 'Create Person',
      originError: 'screens-customer-newUser-index',
    });
    return null;
  }
};

export {createPerson};
