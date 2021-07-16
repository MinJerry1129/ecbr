/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

import { Typography, Colors } from '../../../styles';
import { toastShow } from '../../../utils';
import {
  listCustomerSearch,
  updateCustomer,
} from '../../../services/service/customer';
import { updatePersonOne } from '../../../services/service/Person';
import { getUniqueId } from 'react-native-device-info';
import {
  StorageSet,
  StorageMultGet,
  StorageCleanAll,
} from '../../../services/deviceStorage';
import { seacrhDeliveryAddress } from '../../../services/service/delivery/address';

/* Components */
import TimeRestartCode from './timeRestartCode';

const VerificationCode = ({
  confirmCode,
  getConfirmCode,
  phone,
  setModalLoad,
  log,
  navigation,
  onUserAuth,
  setCodeSMS,
  codeSMS,
}) => {
  const [reinvent, setReinvent] = useState(false);
  const [functionConfirm, setFunctionConfirm] = useState(null);
  const ddi = '+55';

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (codeSMS.length === 6) {
      codeConfirmSMS();
    }
  }, [codeSMS]);

  const registered = useCallback(async () => {
    return new Promise(async (resolve, _reject) => {
      try {
        setModalLoad(true);
        const phoneTxt = `${ddi}${phone}`.replace(/\D/g, '');
        const userRegister = await listCustomerSearch({ phone: phoneTxt });

        if (userRegister && userRegister.person) {
          await StorageSet('_idUser', userRegister._id);
          if (
            userRegister.person &&
            userRegister.person.name &&
            `${userRegister.person.name}`.length >= 5
          ) {
            await StorageSet('nameUser', `${userRegister.person.name}`);
          }

          if (
            userRegister.person &&
            userRegister.person.phone &&
            `${userRegister.person.phone}`.length >= 9
          ) {
            await StorageSet('phoneUser', `${userRegister.person.phone}`);
          }

          if (
            userRegister.person &&
            userRegister.person.email &&
            `${userRegister.person.email}`.length >= 9
          ) {
            await StorageSet('emailUser', `${userRegister.person.email}`);
          }

          let uniqueId = getUniqueId();
          await StorageSet('phoneUser', `{${phoneTxt}}`);

          if (userRegister.device !== uniqueId) {
            await updateCustomer(userRegister._id, {
              device: uniqueId,
            });

            let devices = userRegister?.person?.devices ?? [];
            devices.push(uniqueId);
            await updatePersonOne(userRegister.person._id, {
              devices: devices,
              status: true,
            });
          }

          setModalLoad(false);
          resolve(userRegister);
        }

        setModalLoad(false);
        resolve(false);
      } catch (err) {
        setModalLoad(false);
        toastShow(
          'Falha na autenticação, tente novamente mais tarde',
          'ALERT',
          3000,
        );
        log(err, 'login-registered');
        resolve(false);
      }
    });
  }, [log, phone]);

  const onAuthStateChanged = useCallback(userData => {
    const phoneTxt = `${ddi}${phone}`.replace(/\D/g, '').slice(-10);

    if (
      userData &&
      userData.phoneNumber &&
      `${userData.phoneNumber.replace(/\D/g, '').slice(-10)}` === `${phoneTxt}`
    ) {
      verifyUserSMS();
    }
  }, []);

  const verifyUserSMS = useCallback(async () => {
    return new Promise(async (resolve, _reject) => {
      try {
        await StorageCleanAll();
        const isRegistered = await registered();
        if (isRegistered && isRegistered._id) {
          let params = await StorageMultGet([
            'nameUser',
            'phoneUser',
            'emailUser',
          ]);
          if (!params.nameUser || !params.phoneUser || !params.emailUser) {
            await navigation.navigate('NewUser', { screen: 'NewUser' });
            return;
          }

          await StorageSet('CUSTOMER', { user: isRegistered, guest: false });
          let addresResponse = await seacrhDeliveryAddress({
            customer: isRegistered._id,
            main: true,
          });

          if (addresResponse && addresResponse.length > 0) {
            await StorageSet('@addressUser', addresResponse[0]);
          }

          onUserAuth();
          resolve(true);
        } else {
          await StorageSet('phoneUser', `${ddi}${phone}`);
          await navigation.navigate('NewUser', { screen: 'NewUser' });
          resolve(true);
        }
      } catch (err) {
        resolve(false);
        log(err, 'verifyUserSMS');
      }
    });
  }, [log, navigation, onUserAuth, phone]);

  const codeConfirmSMS = useCallback(async () => {
    try {
      if (codeSMS.length <= 0) {
        setModalLoad(false);
        toastShow('Código inválido, tente novamente', 'ALERT', 2000);
        log('Código inválido, tente novamente', 'login-signIn');
        return;
      }

      try {
        let currentUser = auth().currentUser;
        if (!currentUser) {
          if (functionConfirm) {
            await functionConfirm.confirm(codeSMS);
          } else {
            await getConfirmCode.confirm(codeSMS);
          }

          setModalLoad(true);
          setCodeSMS('');
          verifyUserSMS();
        } else {
          // usuário já está logado sessao auth google
          // auth().currentUser.reauthenticateWithCredential();
        }
      } catch (err) {
        setModalLoad(false);
        console.log('Erro', err);
        toastShow('Código inválido, tente novamente', 'ALERT', 2000);
        log('Código inválido, tente novamente', 'login-signIn');
        setCodeSMS('');
      }
    } catch (err) {
      setModalLoad(false);
      toastShow(
        'Falha na autenticação, tente novamente mais tarde',
        'ALERT',
        3000,
      );
      log(err, 'login-codeConfirmSMS');
    }
  }, [codeSMS]);

  const resetTime = async () => {
    try {
      await StorageSet('@dateSMS', moment().format());
      setReinvent(false);

      let currentUser = auth().currentUser;
      if (currentUser) {
        await auth().currentUser.delete();
      }

      let phoneTxt = ddi + `${phone}`.replace(/\D/g, '');
      let confirmation = await auth().signInWithPhoneNumber(phoneTxt, true);
      setFunctionConfirm(confirmation);
    } catch (err) {
      log(err, 'login-signIn');
      // console.log('resetTime Error', err);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <TouchableOpacity onPress={() => confirmCode(false)}>
          <Icon name="navigate-before" size={40} style={styles.iconGoBack} />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.confirmCodeContainer}>
            <View style={styles.boxTxtConfirmationCode}>
              <Text style={styles.txtConfirmationCode}>
                Insira o código de segurança enviado para o número {phone}.
              </Text>
            </View>
            <View style={styles.boxNumbersCode}>
              <TextInput
                style={styles.numbersCode}
                autoFocus={true}
                onChangeText={value => {
                  setCodeSMS(value);
                }}
                maxLength={6}
                numberOfLines={1}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.txtQuestion}>
              O código deve chegar nos próximos 60 segundos, dependendo da sua
              operadora.
            </Text>

            {reinvent === true ? (
              <>
                <Text style={styles.txtQuestion}>
                  Não recebeu o código de segurança?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    resetTime();
                  }}
                  style={styles.resendCode}>
                  <Text style={styles.otherLoginText}>Reenviar por SMS</Text>
                </TouchableOpacity>
              </>
            ) : (
                <TimeRestartCode setReinvent={setReinvent} />
              )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(VerificationCode);

const styles = StyleSheet.create({
  iconGoBack: {
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    color: Colors.PRIMARY,
  },
  confirmCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  boxTxtConfirmationCode: {
    width: '80%',
  },
  txtConfirmationCode: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_17,
    color: Colors.GRAY_DARK,
    marginTop: 5,
  },
  boxNumbersCode: {
    width: '60%',
    marginTop: 40,
    marginBottom: 20,
    borderWidth: 0.3,
    borderRadius: 30,
    borderColor: Colors.DARK_LIGHT,
    backgroundColor: Colors.GREY_BACKGROUND,
  },
  numbersCode: {
    flexShrink: 1,
    marginHorizontal: 5,
    height: 55,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_30,
    color: Colors.BLACK,
  },
  resendCode: {
    marginTop: 10,
    padding: 10,
  },
  otherLoginText: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_15,
  },
  txtQuestion: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.GRAY_DARK,
    marginTop: 10,
    width: '90%',
  },
});
