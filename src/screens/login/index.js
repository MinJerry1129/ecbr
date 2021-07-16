import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Animated,
  Keyboard,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';

import { createLog } from '../../services/service/Log';

import { getUser } from '../../store/actions/user';

import { Colors } from '../../styles';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import PhoneLogin from './components/phoneLogin';
import VerificationCode from './components/verificationCode';
import SocialMediaLogin from './components/socialMediaLogin';

const Login = ({ navigation, onUserAuth }) => {
  const [phone, setPhone] = useState('');
  const [modalLoad, setModalLoad] = useState(false);
  const [confirmCode, setConfirmCode] = useState(false);
  const [codeSMS, setCodeSMS] = useState('');
  const [firstAccess, setFirstAccess] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const leftLogin = useRef(new Animated.Value(100)).current;
  const leftLoginPhone = useRef(new Animated.Value(0)).current;

  const settingAnimated = useCallback(
    toValue => {
      Keyboard.dismiss();
      Animated.parallel([
        Animated.timing(leftLogin, {
          toValue: toValue,
          useNativeDriver: false,
          duration: 400,
        }),
        Animated.timing(leftLoginPhone, {
          toValue: toValue,
          useNativeDriver: false,
          duration: 400,
        }),
      ]).start();
    },
    [leftLogin, leftLoginPhone],
  );

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

  useEffect(() => {
    settingAnimated(0);
  }, [settingAnimated]);

  useEffect(() => {
    signOut();
  }, []);

  const signOut = async () => {
    if (auth) {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          // Deslogar sessão anteriores ao logar
          await auth().currentUser.delete();
          setModalLoad(false);
          setConfirmCode(false);
        }
      } catch (err) {
        auth()
          .signOut()
          .catch(_err => {
            console.log('Fail signOut firebase ...');
          });
      }
    }
  };

  return (
    <>
      {modalLoad ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : (
          <View style={styles.boxLogin}>
            <StatusBar barStyle="dark-content" />
            <Animated.View style={[styles.inner, { left: leftLogin }]}>
              {confirmCode ? (
                <VerificationCode
                  confirmCode={setConfirmCode}
                  getConfirmCode={confirmCode}
                  phone={phone}
                  setModalLoad={setModalLoad}
                  log={log}
                  navigation={navigation}
                  onUserAuth={onUserAuth}
                  setCodeSMS={setCodeSMS}
                  codeSMS={codeSMS}
                  user={user}
                />
              ) : (
                  <>
                    <SocialMediaLogin
                      settingAnimated={settingAnimated}
                      navigation={navigation}
                      onUserAuth={onUserAuth}
                      log={log}
                      setModalLoad={setModalLoad}
                    />
                  </>
                )}
            </Animated.View>
            <Animated.View
              style={[styles.innerLoginPhone, { left: leftLoginPhone }]}>
              <PhoneLogin
                settingAnimated={settingAnimated}
                phone={phone}
                setPhone={setPhone}
                setModalLoad={setModalLoad}
                log={log}
                setConfirmCode={setConfirmCode}
              />
            </Animated.View>
          </View>
        )}
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onUserAuth: () => dispatch(getUser()),
  };
};

const mapStateToProps = ({ user: user }) => {
  return {
    userAuth: user?.user ?? null,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
