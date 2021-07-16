import messaging from '@react-native-firebase/messaging';
import iid from '@react-native-firebase/iid';
import {updateCustomer} from '../customer';
import packageJson from '../../../../package.json';

const UserRefreshToken = async userAuth => {
  try {
    if (userAuth && userAuth._id !== '') {
      messaging()
        .getToken()
        .then(async token => {
          const instanceIdToken = await instanceId();

          updateCustomer(userAuth._id, {
            instanceIdToken,
            token: token,
            appVersion: packageJson.version,
          });
        });

      return messaging().onTokenRefresh(token => {
        updateCustomer(userAuth._id, {
          token: token,
          appVersion: packageJson.version,
        });
      });
    }
  } catch (err) {
    console.log('Fail Refresh Token User', err);
  }
};

// Instance ID Firebase
const instanceId = async () => {
  try {
    const token = await iid().getToken();
    return token;
  } catch (err) {
    return null;
  }
};

export default UserRefreshToken;
