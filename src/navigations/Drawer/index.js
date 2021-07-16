import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Share} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Colors, Typography} from '../../styles';
import {cleanUser} from '../../services/userAuth';
import userAvatar from '../../assets/images/user-default-2.jpg';
import CustomIcon from '../../components/shared/CustomIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNetInfo} from '@react-native-community/netinfo';
// import database from '@react-native-firebase/database';
// import {getUniqueId} from 'react-native-device-info';
// import pushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import packageJson from '../../../package.json';
import {
  DrawerHeaderWrapper,
  DrawerHeaderAvatar,
  Container,
  AvatarName,
  DrawerHeaderTextWrapper,
  Divider,
  MenuCategory,
} from './styles';
// import Touch from 'react-native-gesture-handler';

export function DrawerContent(props) {
  const address = props.address;
  const guest = props.guest;
  const [user, setUser] = useState({});
  const netInfo = useNetInfo();

  Text.defaultProps = Text.defaultProps || {}; // Ignore dynamic type scaling on iOS
  Text.defaultProps.allowFontScaling = false;

  useEffect(() => {
    if (props.userAuth) {
      setUser(props.userAuth);
    }
  }, [props.userAuth]);

  const exitUser = async () => {
    await cleanUser();
    props.onUserAuth();
  };

  useEffect(() => {
    if (!netInfo.isConnected && props.userAuth) {
      try {
        // Adicionado settimeout por causa do iOS que sempre inicia na tela de "Sem internet"
        setTimeout(() => {
          // if (!netInfo.isConnected) {
          //   props.navigation.navigate('Connectivity');
          // }
        }, 3000);
      } catch (err) {
        console.log('Opps fail Send Screen Connectivity', err);
      }
    }
  }, [props.navigation, props.userAuth, netInfo.isConnected]);

  const screenLocation = () => {
    props.navigation.navigate('Customer', {
      screen: 'CustomerAddress',
    });
  };

  const goPerfil = () => {
    if (!guest || guest !== true) {
      props.navigation.navigate('Customer', {
        screen: 'CustomerEdit',
      });
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Estou te indicando o aplicativo EconomizeBR para economizar sem sair de casa!
          Android: https://play.google.com/store/apps/details?id=com.economize.customer&hl=pt_BR
          IOS: https://apps.apple.com/us/app/economize-br/id1516479439
          `,
        title: 'EconomizeBR',
        url: 'https://apps.apple.com/us/app/economize-br/id1516479439',
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container colors={['#e5f2f8', '#fefefe']}>
      <DrawerHeaderWrapper>
        <TouchableOpacity onPress={() => goPerfil()}>
          {user && user.person && user.person.image ? (
            <DrawerHeaderAvatar
              source={{uri: user.person.image}}
              resizeMode="cover"
            />
          ) : (
            <DrawerHeaderAvatar source={userAvatar} resizeMode="cover" />
          )}
        </TouchableOpacity>
        <DrawerHeaderTextWrapper>
          <AvatarName numberOfLines={1}>
            {guest && guest === true ? 'Convidado' : ''}
            {user && user.person && user.person.name ? user.person.name : ''}
          </AvatarName>
          {!guest || guest !== true ? (
            <TouchableOpacity
              onPress={() => screenLocation()}
              style={styles.touchableStyle}>
              <View style={styles.iconContainer}>
                <Icon name="gps-fixed" size={16} color={Colors.PRIMARY} />
              </View>
              <Text style={styles.txtAddres} allowFontScaling={false}>
                {address}
              </Text>
            </TouchableOpacity>
          ) : null}
        </DrawerHeaderTextWrapper>
      </DrawerHeaderWrapper>
      <DrawerContentScrollView {...props} style={{marginTop: 50}}>
        <DrawerItem
          labelStyle={styles.label}
          icon={() => <CustomIcon name="home" />}
          label="Home"
          onPress={() => {
            props.navigation.navigate('Home', {screen: 'Home'});
          }}
          style={styles.item}
        />
        <DrawerItem
          labelStyle={styles.label}
          icon={() => <CustomIcon name="apple" />}
          label="Mercado"
          onPress={() => {
            props.navigation.navigate('Supermarket', {
              screen: 'Supermarket',
            });
          }}
          style={styles.item}
        />
        <DrawerItem
          labelStyle={styles.label}
          icon={() => <CustomIcon name="fastFood" />}
          label="Restaurante"
          onPress={() => {
            props.navigation.navigate('Restaurant', {screen: 'Restaurant'});
          }}
          style={styles.item}
        />

        {!guest || guest === false ? (
          <>
            <DrawerItem
              labelStyle={styles.label}
              icon={() => <CustomIcon name="favorites" />}
              label="Favoritos"
              onPress={() => {
                props.navigation.navigate('Favorites', {screen: 'Favorites'});
              }}
              style={styles.item}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={() => <CustomIcon name="ticket" />}
              label="Cupom de Desconto"
              onPress={() => {
                props.navigation.navigate('Shopping', {
                  screen: 'Coupon',
                  params: {
                    pageRedirect: null,
                    company: null,
                    subTotal: null,
                    openCart: false,
                    notCoupon: false,
                  },
                });
              }}
              style={styles.item}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={() => <CustomIcon name="market" />}
              label="Pedido"
              onPress={() => {
                props.navigation.navigate('Shopping', {screen: 'MyOrder'});
              }}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={() => <CustomIcon name="share" />}
              label="Compartilhar"
              onPress={() => onShare()}
            />
            <Divider />
            <MenuCategory>Meus Dados</MenuCategory>
            <DrawerItem
              labelStyle={styles.label}
              icon={() => <CustomIcon name="user" />}
              label="Meu Perfil"
              onPress={() => {
                props.navigation.navigate('Customer', {
                  screen: 'CustomerEdit',
                });
              }}
              style={styles.item}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={() => <CustomIcon name="location" />}
              label="Endereços"
              onPress={() => {
                props.navigation.navigate('Customer', {
                  screen: 'CustomerAddress',
                });
              }}
              style={styles.item}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={() => <CustomIcon name="creditCard" />}
              label="Métodos de Pagamento"
              onPress={() => {
                props.navigation.navigate('Shopping', {
                  screen: 'PaymentMethods',
                });
              }}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={() => <CustomIcon name="suport" />}
              label="Suporte"
              onPress={() => {
                props.navigation.navigate('Support', {
                  screen: 'Support',
                });
              }}
            />
          </>
        ) : null}

        <Divider />
        {/* <DrawerItem
          labelStyle={styles.label}
          icon={() => <CustomIcon name="clientSupport" />}
          label="Fale conosco"
          onPress={() => {
            props.navigation.navigate('Support', {screen: 'Contact'});
          }}
        /> */}
        {/* <DrawerItem
          labelStyle={styles.label}
          icon={() => <CustomIcon name="partner" />}
          label="Seja Parceiro"
          onPress={() => null}
        /> */}
        <DrawerItem
          labelStyle={styles.label}
          label={`Versão: ${packageJson.version}`}
        />
        <Divider />
        <DrawerItem
          labelStyle={styles.label}
          icon={() => <CustomIcon name="exit" />}
          label="Sair"
          onPress={() => exitUser()}
        />
      </DrawerContentScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  headerMenu: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  label: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_16,
  },
  touchableStyle: {
    flexDirection: 'row',
  },
  iconContainer: {
    marginTop: 6,
    marginRight: 5,
  },
  txtAddres: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginTop: 6,
  },
  item: {
    marginBottom: -8,
  },
});
