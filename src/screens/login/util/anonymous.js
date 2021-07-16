import {getUniqueId} from 'react-native-device-info';

function Anonymous() {
  async function authenticateUser() {
    try {
      const uniqueId = getUniqueId();
      // Pesquisar se Existe usuario
    } catch (err) {
      return false;
    }
  }

  return {
    authenticateUser,
  };
}

export default Anonymous;
