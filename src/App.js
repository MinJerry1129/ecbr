/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, Text, TextInput} from 'react-native';

import {connect} from 'react-redux';
import Navigator from './navigations';
import UserRefreshToken from './services/service/tokenMessage/userRefreshToken';
import messaging from '@react-native-firebase/messaging';
import iid from '@react-native-firebase/iid';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
// import NotificationPermission from './services/permissions/notifications';

const App = ({userAuth, guest}) => {
  Text.defaultProps = Text.defaultProps || {}; // Ignore dynamic type scaling on iOS
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;

  useEffect(() => {
    PushNotification.configure({
      onNotification: function(notification) {
        // console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  useEffect(() => {
    // console.log('userAuth app.js', userAuth);
    // console.log('guest app.js', guest);
    if (guest === false) {
      UserRefreshToken(userAuth);
    }
  }, [userAuth?._id]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      try {
        if (remoteMessage.notification && remoteMessage.notification.body) {
          let title = remoteMessage.notification?.title || 'EconomizeBr';

          PushNotification.localNotification({
            title: title,
            message: remoteMessage.notification.body,
            smallIcon: 'ic_notification',
            vibrate: true,
            vibration: 300,
            priority: 'high',
            importance: 'high',
            popInitialNotification: true,
            requestPermissions: true,
          });
        }
      } catch (err) {
        console.log('Error receive message', err);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Navigator />
    </>
  );
};

const mapStateToProps = ({user: user}) => {
  return {
    userAuth: user?.user ?? null,
    guest: user?.guest ?? null,
  };
};

export default connect(mapStateToProps)(App);
