import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import firebase from '@react-native-firebase/auth';

const googleConfigure = () => {
  GoogleSignin.configure({
    iosClientId:
      '533571580062-5v9suh3015uh3sqtfkllgqmqafke6efo.apps.googleusercontent.com',
    webClientId:
      '533571580062-g5m5dvr0hbjrhao014ec0is3p2mqlb98.apps.googleusercontent.com',
    offlineAccess: true,
    hostsDomain: '',
    //forceConsentPrompt: true,
  });
};

const getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      console.log('Not User Status SIGN_IN_REQUIRED');
      return false;
    } else {
      console.log('Error All getCurrentUserInfo', error);
      return false;
    }
  }
};

const signInGoogle = async (callBack) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const credential = firebase.auth.GoogleAuthProvider.credential(
      userInfo.idToken,
      userInfo.accessToken,
    );

    //console.log('Firebase Credential ', credential);

    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);

    console.log('Firebase User Credential ', firebaseUserCredential);
    callBack(userInfo.user);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Login Fechado ou Cancelado', error.code);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Login já está em andamento', error.code);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('PlayService não disponível ou desatualizado', error.code);
    } else {
      console.log('Error Geral', error);
    }
  }
};

export {googleConfigure, getCurrentUserInfo, signInGoogle};
