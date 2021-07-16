import AsyncStorage from '@react-native-community/async-storage';

const StorageMultClean = async keys => {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (err) {
    return false;
  }
};

const StorageClean = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    console.log('AsyncStorage Error: ' + err.message);
    return false;
  }
};

const StorageMultGet = async keys => {
  try {
    let itens = await AsyncStorage.multiGet(keys);
    let response = {};

    for (let i = 0; i < keys.length; i += 1) {
      if (itens[i] && itens[i][0] === keys[i]) {
        response[keys[i]] = itens[i][1];
      } else {
        response[keys[i]] = '';
      }
    }

    return response;
  } catch (err) {
    return null;
  }
};

const StorageGet = async key => {
  try {
    let item = await AsyncStorage.getItem(key);
    try {
      item = JSON.parse(item);
      return item;
    } catch (e) {
      return item;
    }
  } catch (err) {
    console.log('AsyncStorage Error: ' + err.message);
    return null;
  }
};

const StorageSet = async (key, value) => {
  try {
    let item = value;
    if (typeof item === 'object') {
      item = JSON.stringify(item);
    }

    await AsyncStorage.setItem(key, item);
  } catch (err) {
    console.log('StorageSet Error: ' + err.message);
  }
};

const StorageCleanAll = async () => {
  let keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(keys);
};

export {
  StorageMultClean,
  StorageClean,
  StorageMultGet,
  StorageGet,
  StorageSet,
  StorageCleanAll,
};
