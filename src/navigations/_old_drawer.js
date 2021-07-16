/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNetInfo } from '@react-native-community/netinfo';

import { getUniqueId } from 'react-native-device-info';
import database from '@react-native-firebase/database';
import pushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import { Colors, Typography } from '../styles';
import { cleanUser } from '../services/userAuth';

export function DrawerContent(props) {
  const address = props.address;
  const [user, setUser] = useState({});
  const netInfo = useNetInfo();
  let deviceId = getUniqueId();
  let push = pushNotification;

  push.configure({
    onNotification: function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);

      if (notification?.message?.match('Seu pedido está:')) {
        return props.navigation.navigate('Shopping', {
          screen: 'MyOrder',
        });
      }

      if (notification?.message === 'Você recebeu uma nova mensagem no chat') {
        return props.navigation.navigate('Support', {
          screen: 'ChatPayment',
          params: {
            payment: notification.params,
          },
        });
      }
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  useEffect(() => {
    database()
      .ref('/general')
      .on('value', value => {
        value.forEach(alert => {
          push.localNotification({
            message: alert.val().message,
          });
        });
      });

    database()
      .ref(`/user_${deviceId}`)
      .on('value', value => {
        value.forEach(alert => {
          if (alert.val().params) {
            push.localNotification({
              message: alert.val().message,
              params: alert.val().params,
            });
          } else {
            push.localNotification({
              message: alert.val().message,
            });
          }
        });
      });
  }, [push]);

  useEffect(() => {
    if (props.userAuth) {
      setUser(props.userAuth);
    }
  }, [props.userAuth]);

  const exitUser = async () => {
    await cleanUser();
    props.onUserAuth();
  };

  const screenLocation = () => {
    props.navigation.navigate('Customer', {
      screen: 'CustomerAddress',
    });
  };

  useEffect(() => {
    if (!netInfo.isConnected && props.userAuth) {
      try {
        // Adicionado settimeout por causa do iOS que sempre inicia na tela de "Sem internet"
        setTimeout(() => {
          if (!netInfo.isConnected) {
            props.navigation.navigate('Connectivity');
          }
        }, 1500);
      } catch (err) {
        console.log('Opps fail Send Screen Connectivity', err);
      }
    }
  }, [props.navigation, props.userAuth, netInfo.isConnected]);

  return (
    <View style={styles.content}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.viewMargin}>
              <Avatar.Image
                source={require('../assets/images/user-default.jpg')}
                size={60}
              />
              <View style={styles.viewMargin}>
                <View style={styles.nameUser}>
                  <Text style={styles.title}>
                    {user && user.person && user.person.name
                      ? user.person.name
                      : ''}
                  </Text>
                  {address && (
                    <TouchableOpacity onPress={() => screenLocation()}>
                      <Text style={styles.caption}>
                        <Icon
                          name="gps-fixed"
                          size={16}
                          color={Colors.PRIMARY}
                        />
                        {address}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              labelStyle={styles.label}
              icon={({ color, size }) => (
                <Icon name="home" color={Colors.PRIMARY} size={25} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home', { screen: 'Home' });
              }}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={({ color, size }) => (
                <Icon2
                  name="food-apple-outline"
                  color={Colors.PRIMARY}
                  size={25}
                />
              )}
              label="Supermercados"
              onPress={() => {
                props.navigation.navigate('Supermarket', {
                  screen: 'Supermarket',
                });
              }}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={({ color, size }) => (
                <Icon2 name="food" color={Colors.PRIMARY} size={25} />
              )}
              label="Restaurantes"
              onPress={() => {
                props.navigation.navigate('Restaurant', { screen: 'Restaurant' });
              }}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={({ color, size }) => (
                <Icon name="shopping-cart" color={Colors.PRIMARY} size={25} />
              )}
              label="Pedidos"
              onPress={() => {
                props.navigation.navigate('Shopping', { screen: 'MyOrder' });
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection} title="Meus dados">
            <DrawerItem
              labelStyle={styles.label}
              icon={({ color, size }) => (
                <Icon2
                  name="account-circle-outline"
                  color={Colors.PRIMARY}
                  size={25}
                />
              )}
              label="Meu perfil"
              onPress={() => {
                props.navigation.navigate('Customer', {
                  screen: 'CustomerEdit',
                });
              }}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={({ color, size }) => (
                <Icon name="my-location" color={Colors.PRIMARY} size={25} />
              )}
              label="Endereços"
              onPress={() => {
                props.navigation.navigate('Customer', {
                  screen: 'CustomerAddress',
                });
              }}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={({ color, size }) => (
                <Icon2 name="credit-card" color={Colors.PRIMARY} size={25} />
              )}
              label="Métodos de Pagamento"
              onPress={() => {
                props.navigation.navigate('Shopping', {
                  screen: 'PaymentMethods',
                });
              }}
            />
          </Drawer.Section>
          <Drawer.Section
            color={Colors.SECONDARY}
            style={[styles.drawerSection]}
            title="Promoções">
            <DrawerItem
              labelStyle={styles.label}
              icon={({ color, size }) => (
                <Icon2 name="sale" color={Colors.PRIMARY} size={25} />
              )}
              label="Cupons"
              onPress={() => {
                props.navigation.navigate('Shopping', {
                  screen: 'Coupon',
                  params: {
                    company: null,
                  },
                });
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Contato e Suporte">
            {/* <DrawerItem
              labelStyle={styles.label}
              icon={({color, size}) => (
                <Icon2
                  name="account-star-outline"
                  color={Colors.PRIMARY}
                  size={25}
                />
              )}
              label="Fale conosco"
              onPress={() => {
                props.navigation.navigate('Support', {screen: 'Contact'});
              }}
            /> */}
            {/* <DrawerItem
              labelStyle={styles.label}
              icon={({color, size}) => (
                <Icon2 name="food-variant" color={Colors.PRIMARY} size={25} />
              )}
              label="Quero ser um Shopper"
              onPress={() => {}}
            /> */}
            {/* <DrawerItem
              labelStyle={styles.label}
              icon={({color, size}) => (
                <Icon2 name="motorbike" color={Colors.PRIMARY} size={25} />
              )}
              label="Quero ser entregador"
              onPress={() => {}}
            /> */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={styles.label}
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={Colors.PRIMARY} size={25} />
          )}
          label="Sair"
          onPress={() => exitUser()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  label: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY_DARK,
    fontSize: Typography.FONT_SIZE_16,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginLeft: 5,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: 3,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  caption: {
    marginTop: 8,
    paddingTop: 5,
    fontSize: Typography.FONT_SIZE_14,
    lineHeight: 14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.GREY,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  drawerSection: {
    marginTop: 15,
    color: Colors.SECONDARY,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  viewMargin: {
    flexDirection: 'row',
    marginTop: 15,
  },
  nameUser: {
    flexDirection: 'column',
    height: '100%',
  },
});
