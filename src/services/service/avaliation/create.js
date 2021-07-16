import api, {ErrorAxios} from '../../api';
import {createLog} from '../Log';

const createAvaliation = async post => {
  try {
    const response = await api.post('/avaliation/create', post);
    const data = response.data;
    if (data && data.data) {
      return data.data;
    }

    return data;
  } catch (err) {
    let errorData = ErrorAxios(err, 'Fail createAvaliation');
    createLog({
      typeSystem: 'MOBILE',
      typeLog: 'ERROR',
      description: errorData,
      category: 'Create Avaliation',
      originError: 'screens-order-index',
    });
    return null;
  }
};

export {createAvaliation};
