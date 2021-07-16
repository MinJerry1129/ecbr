import api, {ErrorAxios} from '../../api';
import {createLog} from '../Log';

const message = async post => {
  try {
    const response = await api.post('/chat', post);
    const data = response.data;
    return data;
  } catch (err) {
    let errorData = ErrorAxios(err, 'Fail Create Message');
    createLog({
      typeSystem: 'MOBILE',
      typeLog: 'ERROR',
      description: errorData,
      category: 'Create Message',
      originError: 'screens-chat-message',
    });
    return null;
  }
};

export default message;
