/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';

import { toastShow } from '../../../utils';

import auth from '@react-native-firebase/auth';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography, Colors } from '../../../styles';
import { StorageSet } from '../../../services/deviceStorage';

const PhoneLogin = ({
  settingAnimated,
  phone,
  setPhone,
  setModalLoad,
  log,
  setConfirmCode,
}) => {
  const authSMS = async phoneNumber => {
    try {
      setModalLoad(true);
      let messageError = 'Falha na autenticação, tente novamente mais tarde';
      if (phoneNumber && phoneNumber.length >= 10) {
        await StorageSet('@dateSMS', moment().format());

        // Only numbers
        const phoneOnlyNumbers = phoneNumber.replace(/\D/g, '');
        if (phoneOnlyNumbers.length < 11) {
          setModalLoad(false);
          toastShow('Informe um número válido!', 'ALERT', 3000);
          log('Informe um número válido!', 'login-authSMS');
          return;
        }

        const phoneFormat = `+55${phoneOnlyNumbers}`;
        let confirmation = await auth()
          .signInWithPhoneNumber(phoneFormat, true)
          .catch(error => {
            log(error.message, 'login-authSMS');
            messageError = 'Erro na requisição 2, tente novamente mais tarde.';

            if (typeof error !== 'string') {
              const errorMessage = JSON.stringify(error.message);
              const search = errorMessage.indexOf(
                'blocked all requests from this device',
              );

              if (Number(search) >= 0) {
                toastShow(
                  'Acesso bloqueado temporariamente por comportamento anormal. Entre em contato com o suporte.',
                  'ALERT',
                  3000,
                );
                log(
                  'Acesso bloqueado temporariamente por comportamento anormal',
                  'login-authSMS',
                );
              } else {
                toastShow(messageError, 'ALERT', 3000);
                log(messageError, 'login-authSMS');
              }
            } else {
              toastShow(messageError, 'ALERT', 3000);
              log(messageError, 'login-authSMS');
            }
          });

        if (confirmation) {
          setModalLoad(false);
          setConfirmCode(confirmation);
          settingAnimated(0);
        } else {
          setModalLoad(false);
          log(confirmation, 'login-authSMS');
        }
      } else {
        setModalLoad(false);
        toastShow('Informe um número válido!', 'ALERT', 3000);
        log('Informe um número válido!', 'login-authSMS');
      }
    } catch (err) {
      log(err, 'login-authSMS');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableOpacity onPress={() => settingAnimated(0)}>
          <Icon name="navigate-before" size={40} style={styles.iconGoBack} />
        </TouchableOpacity>
      </SafeAreaView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.center}>
          <View style={styles.loginPhoneContainer}>
            <Text style={styles.title}>Digite seu número de celular</Text>
            <View style={styles.boxPhone}>
              <View style={styles.brazilPhone}>
                <Image source={require('../../../assets/images/br.png')} />
                <Text style={styles.phoneTag}>+55</Text>
              </View>
              <TextInputMask
                type={'cel-phone'}
                value={phone}
                style={styles.inputPhone}
                onChangeText={setPhone}
                onSubmitEditing={() => authSMS(phone)}
                placeholder="Seu número"
                placeholderTextColor="#999a99"
                keyboardType="phone-pad"
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => authSMS(phone)}
              style={styles.guest}>
              <Text style={styles.guestText}>Enviar código por SMS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default PhoneLogin;

const styles = StyleSheet.create({
  iconGoBack: {
    color: Colors.PRIMARY,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  loginPhoneContainer: {
    width: '90%',
    marginTop: 40,
  },
  title: {
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    letterSpacing: 1,
    color: Colors.BLACK,
  },
  boxPhone: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: 65,
  },
  brazilPhone: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ececec',
  },
  phoneTag: {
    fontSize: Typography.FONT_SIZE_22,
    color: '#999a99',
    marginLeft: 7,
    marginRight: 12,
  },
  inputPhone: {
    color: Colors.BLACK,
    flex: 1,
    fontSize: Typography.FONT_SIZE_22,
    marginLeft: 8,
  },
  guest: {
    flexShrink: 1,
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 30,
    height: 45,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestText: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    letterSpacing: 1,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  safeAreaView: {
    marginTop: 20,
  },
});
