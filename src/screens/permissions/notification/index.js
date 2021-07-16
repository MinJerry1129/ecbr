/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './styles';

import NotificationPermission from '../../../services/permissions/notifications';

const Notification = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const logo = require('../../../assets/images/logo_splash.png');
  const notification = require('./images/notification.png');

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      let isPermission = await NotificationPermission().isPermission();
      if (isPermission) {
        next();
        // setShow(true);
      } else {
        setShow(true);
      }
    } catch (err) { }
  };

  const acceptPermission = async () => {
    try {
      let isPermission = null;
      isPermission = await NotificationPermission().isPermission();
      console.log('isPermission', isPermission);

      if (isPermission === true) {
        next();
        return;
      }

      if (Platform.OS === 'ios') {
        isPermission = NotificationPermission().requestPermissionIOS();
        if (isPermission) {
          next();
          return;
        }
      }

      Linking.openSettings();
    } catch (err) {
      console.log('Error acceptPermission', err);
    }
  };

  const next = () => {
    try {
      navigation.navigate('Permissions', { screen: 'Location' });
    } catch (err) { }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {!show || show === false ? (
        <View style={styles.containerShow}>
          <Image style={styles.logoShow} resizeMode="contain" source={logo} />
        </View>
      ) : (
          <>
            <StatusBar barStyle={'dark-content'} />
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              <View style={styles.container}>
                <Text style={styles.title}>SEJA BEM-VINDO</Text>
                <Text style={styles.title}>Economize tempo e dinheiro</Text>
                <View style={styles.icon}>
                  <Image source={notification} />
                </View>
                <Text style={styles.titlePermition}>Permitir notificações</Text>
                <Text style={styles.descricao}>
                  Fique sabendo tudo sobre cupons e acompanhe seus pedidos
              </Text>
              </View>
            </ScrollView>
            <View style={styles.BoxFooter}>
              <TouchableOpacity style={styles.btn} onPress={() => next()}>
                <Text style={styles.btnText}>Pular</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnPrimary]}
                onPress={() => acceptPermission()}>
                <Text style={[styles.btnText, styles.btnTextPrimary]}>
                  Permitir
              </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
    </SafeAreaView>
  );
};

export default Notification;
