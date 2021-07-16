import {
  StorageSet,
  StorageGet,
  StorageCleanAll,
} from '../services/deviceStorage';
import {
  createCustomer,
  updateCustomer,
  createGuest,
} from '../services/service/customer';
import {createPerson, updatePersonOne} from '../services/service/Person';

import {getUniqueId} from 'react-native-device-info';
import {listCustomerSearch} from './service/customer/list';
import auth from '@react-native-firebase/auth';
import LocationCurrent from './location/locationCurrent';
import Permission from '../services/permissions/locationPermission';
import {getAddress} from '../store/actions/user';

const keyNme = 'CUSTOMER';

const isAuthenticated = async () => {
  try {
    const user = await StorageGet('CUSTOMER');

    if (user && user.user && user.user._id) {
      return user;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Error Auth', err);
    return false;
  }
};

const getAuthenticated = async () => {
  try {
    const user = await StorageGet('CUSTOMER');
    return user;
  } catch (err) {
    return false;
  }
};

const userAuth = async (user, loginType) => {
  switch (loginType) {
    case 'google':
      return await google(user);
    case 'facebook':
      return await facebook(user);
    case 'apple':
      return await apple(user);
    case 'guest':
      return await guest(user);
    case 'sms':
      return await sms(user);
    default:
      return await defaultAuth(user);
  }
};

const google = async user => {
  try {
    let uniqueId = getUniqueId();
    const userSearch = await listCustomerSearch({email: user.email});

    if (userSearch !== null && userSearch.person) {
      await StorageSet('_idUser', userSearch._id);

      if (userSearch.device !== uniqueId) {
        await updateCustomer(userSearch._id, {
          device: uniqueId,
        });

        let devices = userSearch.person.devices ?? [];
        devices.push(uniqueId);

        await updatePersonOne(userSearch.person._id, {
          devices: devices,
          status: true,
        });
      }

      if (
        userSearch.person &&
        userSearch.person.name &&
        `${userSearch.person.name}`.length >= 5
      ) {
        await StorageSet('nameUser', `${userSearch.person.name}`);
      }

      if (
        userSearch.person &&
        userSearch.person.phone &&
        `${userSearch.person.phone}`.length >= 9
      ) {
        await StorageSet('phoneUser', `{${userSearch.person.phone}}`);
      }

      if (
        userSearch.person &&
        userSearch.person.email &&
        `${userSearch.person.email}`.length >= 9
      ) {
        await StorageSet('emailUser', `${userSearch.person.email}`);
      }

      return userSearch;
    }

    let person = await createPerson({
      name: user.name,
      email: user.email.toLowerCase(),
      devices: [uniqueId],
      status: true,
    });

    if (!person || !person._id) {
      return false;
    }

    let userCreate = await createCustomer({
      device: uniqueId,
      email: user.email.toLowerCase(),
      person: person._id,
    });

    if (!userCreate || !userCreate._id) {
      return false;
    }

    await StorageSet('_idUser', `${userSearch._id}`);
    await StorageSet('nameUser', `${user.name}`);
    await StorageSet('emailUser', `${user.email.toLowerCase()}`);
    return userCreate;
  } catch (err) {
    console.log('fail', err);
    return false;
  }
};

const sms = async user => {
  await StorageSet(keyNme, {user: user, guest: false});
};

const apple = async appleInfo => {
  try {
    let uniqueId = getUniqueId();
    const userAppleAuth = appleInfo.user;
    const userSearch = await listCustomerSearch({
      email: userAppleAuth.email.toLowerCase(),
    });

    if (userSearch !== null && userSearch.person) {
      await StorageSet('_idUser', `${userSearch._id}`);
      if (userSearch.device !== uniqueId) {
        await updateCustomer(userSearch._id, {
          device: uniqueId,
        });
        let devices = userSearch.person.devices ?? [];
        devices.push(uniqueId);

        await updatePersonOne(userSearch.person._id, {
          devices: devices,
          status: true,
        });
      }

      if (
        userSearch.person &&
        userSearch.person.name &&
        `${userSearch.person.name}`.length >= 5
      ) {
        await StorageSet('nameUser', `${userSearch.person.name}`);
      }

      if (
        userSearch.person &&
        userSearch.person.phone &&
        `${userSearch.person.phone}`.length >= 9
      ) {
        await StorageSet('phoneUser', `${userSearch.person.phone}`);
      }

      if (
        userSearch.person &&
        userSearch.person.email &&
        `${userSearch.person.email}`.length >= 9
      ) {
        await StorageSet('emailUser', `${userSearch.person.email}`);
      }

      return userSearch;
    }

    let person = await createPerson({
      name: userAppleAuth.displayName || userAppleAuth.email.split('@')[0],
      email: userAppleAuth.email.toLowerCase(),
      devices: [uniqueId],
      status: true,
    });

    if (!person || !person._id) {
      return false;
    }

    let userCreate = await createCustomer({
      device: uniqueId,
      // token: getToken,
      email: userAppleAuth.email.toLowerCase(),
      person: person._id,
    });

    if (!userCreate || !userCreate._id) {
      return false;
    }

    await StorageSet('_idUser', userCreate._id);
    return userCreate;
  } catch (err) {
    // console.log(err);
    return false;
  }
};

const facebook = async user => {
  try {
    let uniqueId = getUniqueId();
    const userFacebookAuth = user.user;
    const userSearch = await listCustomerSearch({
      email: userFacebookAuth.email.toLowerCase(),
    });

    if (userSearch !== null && userSearch.person) {
      if (userSearch.device !== uniqueId) {
        await updateCustomer(userSearch._id, {
          device: uniqueId,
        });
        let devices = userSearch.person.devices ?? [];
        devices.push(uniqueId);

        await updatePersonOne(userSearch.person._id, {
          devices: devices,
          status: true,
        });
      }

      if (
        !userSearch.person.name ||
        userSearch.person.name === '' ||
        !userSearch.person.phone
      ) {
        return false;
      }

      await StorageSet(keyNme, {user: userSearch, guest: false});
      return true;
    }

    let person = await createPerson({
      name: userFacebookAuth.displayName || 'Cliente',
      email: userFacebookAuth.email.toLowerCase(),
      devices: [uniqueId],
      status: true,
    });

    let userCreate = await createCustomer({
      device: uniqueId,
      // token: getToken,
      email: userFacebookAuth.email.toLowerCase(),
      person: person._id,
    });

    await StorageSet(keyNme, {user: userCreate, guest: false});
    return true;
  } catch (err) {
    console.log(err);
  }
};

const guest = async (user = {}) => {
  try {
    let isPermission = await Permission().isPermission();
    if (!isPermission) {
      isPermission = await Permission().setPermission();
    }

    let idDevice = getUniqueId();

    if (!idDevice) {
      return false;
    }

    user.device = idDevice;
    let location;

    if (isPermission) {
      location = await LocationCurrent().getLocation();
    }

    if (location && location.latitude && location.longitude) {
      user.latitude = location.latitude;
      user.longitude = location.longitude;
    }

    let guestResponse = await createGuest(user);

    if (!guestResponse || !guestResponse._id) {
      return false;
    }

    await StorageSet(keyNme, {user: guestResponse, guest: true});
    // getAddress();
    return guestResponse;
  } catch (err) {
    return false;
  }
};

const defaultAuth = async user => {
  //await StorageSet('USER', user);
};

const cleanUser = async () => {
  try {
    await StorageCleanAll();
    if (auth) {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth.signOut().then(() => console.log('Clean Auth Firebase'));
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default userAuth;
export {userAuth, isAuthenticated, getAuthenticated, cleanUser};
