import auth from '@react-native-firebase/auth';
import {Platform} from 'react-native';
import {createLog} from '../services/service/Log';
var confirmResult = null;

const signInSMS = async phoneNumber => {
  try {
    console.log(
      'looooog log confirm result',
      confirmResult,
      'phone number',
      phoneNumber,
    );
    confirmResult = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('log confirm result', confirmResult);
    return confirmResult;
  } catch (err) {
    console.log('Error signInSMS SMS', err);
    log(err, 'error-signInSMS-SMS');
    return false;
  }
};

const confirmSMS = async (verificationCode, confirm) => {
  try {
    console.log('log a', confirm, 'VERIFIIIII AAA', verificationCode);
    if (confirm) {
      console.log('log b', confirm);
      const user = await confirm.confirm(verificationCode);
      console.log('log c', confirm, 'userrrr', user);
      return user;

      /*
      console.log('Credential SMS', confirmResult.verificationId);
      console.log('verificationCode', verificationCode);

      let credential = firebase.auth.PhoneAuthProvider.credential(
        confirmResult.verificationId,
        verificationCode,
      );

      console.log('Credential SMS', credential);

      let resp = await firebase.auth().signInWithCredential(credential);
      console.log('Resposta Confirm SMS', resp);
      return resp;
      */
    } else {
      console.log('log d error');
      return false;
    }
  } catch (err) {
    console.log('Error confirmSMS', err);
    log(err, 'error-confirmSM');
    return false;
  }
};

const signOutSMS = () => {
  if (Platform.OS === 'android') {
    //
  }
};

const log = (err, originError) => {
  try {
    createLog({
      typeSystem: 'MOBILE',
      typeLog: 'ERROR',
      description: err,
      category: 'login-auth',
      originError: originError,
    });
  } catch (_err) {
    return false;
  }
};

export {signInSMS, signOutSMS, confirmSMS};
