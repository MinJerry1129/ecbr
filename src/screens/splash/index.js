/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { isAuthenticated } from '../../services/userAuth';
import { createLog } from '../../services/service/Log';
import { StorageCleanAll } from '../../services/deviceStorage';
import Permission from '../../services/permissions/locationPermission';
import { customerCurrent } from '../../services/service/customer';
import { getUser } from '../../store/actions/user';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import { Colors } from '../../styles';
console.disableYellowBox = true;

export const Splash = ({ navigation, onUserAuth }) => {
  const logo = require('../../assets/images/logo_splash.png');

  const checkPermission = async () => {
    try {
      const isPermission = await Permission().isPermission();

      if (isPermission) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Permissions');
      }
    } catch (err) {
      await createLog({
        typeSystem: 'MOBILE',
        typeLog: 'ERROR',
        description: 'Erro na checagem da permissão de localização',
        category: 'Check Permission',
        err,
        originError: 'screens-splash',
      });
    }
  };

  const isLogin = async auth => {
    try {
      let _id = auth._id;
      NetInfo.fetch().then(async state => {
        if (state.isConnected) {
          let userResponse = await customerCurrent(_id);
          if (!userResponse || !userResponse.person) {
            await StorageCleanAll();
            onUserAuth();
          }
        }
      });
    } catch (err) {
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      navigation.closeDrawer();
      setTimeout(async () => {
        try {
          const { user: auth } = await isAuthenticated();
          if (!auth) {
            checkPermission();
          } else if (auth && auth.person && auth._id) {
            isLogin(auth);
          }
        } catch (err) { }
      }, 400);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Image style={styles.logo} resizeMode="contain" source={logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  header: {
    flex: 1,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  footer: {
    flex: 1,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onUserAuth: () => dispatch(getUser()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Splash);
