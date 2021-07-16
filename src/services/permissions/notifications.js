import {Platform} from 'react-native';
import {
  request,
  checkNotifications,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import messaging, {AuthorizationStatus} from '@react-native-firebase/messaging';

function NotificationPermission() {
  function isPermission() {
    return new Promise((resolve, reject) => {
      try {
        checkNotifications()
          .then(({status, settings}) => {
            resolve(true);
          })
          .catch(err => {
            console.log('Fail Permissions', err);
            reject(false);
          });
      } catch (err) {
        console.log('Fail Permissions', err);
        resolve(false);
      }
    });
  }

  async function requestPermissionIOS() {
    if (Platform.OS === 'ios') {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === AuthorizationStatus.AUTHORIZED ||
          authStatus === AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          return true;
        }

        return false;
      } catch (err) {
        return false;
      }
    }
  }

  return {
    isPermission,
    requestPermissionIOS,
  };
}

export default NotificationPermission;
