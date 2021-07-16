/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { DrawerItems } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';

import { Colors, Spacing, Typography } from '../../../styles/';
import { isAuthenticated, cleanUser } from '../../../services/userAuth';

const Menu = props => {
  const [name, setName] = useState('');
  const address = props.address;

  useEffect(() => {
    customer();
  }, []);

  const customer = async () => {
    const { user: customerResult } = await isAuthenticated();
    if (customerResult !== false) {
      setName(' ' + customerResult.name);
    }
  };

  const exitUser = async () => {
    await cleanUser();
    props.navigation.navigate('Splash');
  };

  const editProfile = () => {
    props.navigation.navigate('CustomerEdit');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrolContainer}>
      <ImageBackground
        source={require('../../../assets/images/bg-menu.jpg')}
        style={styles.imageBackground}>
        <Image
          source={require('../../../assets/images/user-default.jpg')}
          style={styles.profile}
        />
        <TouchableOpacity onPress={() => editProfile()}>
          <Text style={styles.titlePerfil}>{name}</Text>
        </TouchableOpacity>
        <View style={styles.imageBackgroundView}>
          {address ? (
            <>
              <Text style={styles.address}>{address}</Text>
              <Icon name="gps-fixed" size={16} color={Colors.WHITE} />
            </>
          ) : null}
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <DrawerItems {...props} />

        <TouchableOpacity
          style={styles.logaoutContainer}
          onPress={() => exitUser()}>
          <View style={styles.logoutView}>
            <Icon style={styles.iconFooter} name="undo" size={16} />
            <Text style={styles.txtFooter}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const formatAddress = address => {
  if (address !== null && address.length > 5) {
    try {
      return address.substr(0, 20).split(' - ', 1)[0];
    } catch (err) {
      return address.substr(0, 20);
    }
  }
};

const mapStateToProps = ({ user: user }) => {
  return { address: formatAddress(user.addres) };
};

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
  scrolContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    //backgroundbackgroundColor: Colors.DARK,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  titlePerfil: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginVertical: 8,
  },
  imageBackground: {
    width: undefined,
    padding: 16,
    paddingTop: 48,
  },
  imageBackgroundView: {
    flexDirection: 'row',
  },
  address: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    marginRight: 4,
    marginLeft: 8,
  },
  header: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  headerUser: {
    margin: Spacing.SCALE_12,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_14,
    textAlign: 'center',
  },
  userName: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: '#FFFF03',
  },
  containerAvatar: {
    marginLeft: Spacing.SCALE_16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: Colors.SECONDARY,
  },
  logout: {
    marginRight: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_8,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.WHITE,
    textAlign: 'right',
  },
  logaoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    marginLeft: 10,
    //backgroundColor: 'orange',
  },
  logoutView: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
    marginLeft: 18,
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  iconFooter: {
    marginRight: 20,
  },
  txtFooter: {
    marginHorizontal: 8,
    color: Colors.ALERT,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
});
