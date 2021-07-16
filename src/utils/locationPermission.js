import {PermissionsAndroid, Alert, Linking, Platform} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const runtimePermission = async alwaysAsk => {
  if (Platform.OS === 'ios') {
    return await runtimePermissionIOS(alwaysAsk);
  } else {
    return await runtimePermissionAndroid(alwaysAsk);
  }
};

const runtimePermissionAndroid = async alwaysAsk => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'EconomizeBr',
        message: 'Permita o EconomizeBr a ter acesso a sua localização ?',
        buttonPositive: 'Permitir',
        buttonNegative: 'Negar',
      },
    );
    /*
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permissão de Localização Concedido');
    } else {
      Alert.alert('Sem permissão');
    }
    */

    if (granted === 'never_ask_again') {
      if (alwaysAsk) {
        Alert.alert(
          'Permissão',
          'É necessário conceder permissão Localização',
          [
            {
              text: 'Proceguir',
              onPress: () => Linking.openSettings(),
            },
          ],
          {cancelable: false},
        );
      }
      return false;
    } else if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Sem permissão Localização');
      return false;
    } else {
      //console.log('Permissão Localização OK!');
      return true;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const runtimePermissionIOS = async alwaysAsk => {
  try {
    await request(PERMISSIONS.IOS.LOCATION_ALWAYS, {
      title: 'EconomizeBr',
      message: 'Permita o EconomizeBr a ter acesso a sua localização ?',
      buttonPositive: 'SIM',
      buttonNegative: 'NÃO',
    });

    check(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          return false;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          return false;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          return true;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          return false;
      }
    });
  } catch (err) {
    console.log('Fail Check Permission IOS', err);
    return false;
  }
};

export default runtimePermission;
export {runtimePermission};
