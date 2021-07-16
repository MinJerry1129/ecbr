import NotificationPermission from './notifications';
import LocationPermission from './locationPermission';

const statusPermissions = async () => {
  try {
    const isNotification = await NotificationPermission().isPermission();
    const isLocation = await LocationPermission().isPermission();

    if (!isNotification || !isLocation) {
      return false;
    }

    return true;
  } catch (err) {
    console.log('StatusPermissions', err);
    return false;
  }
};

export default statusPermissions;
