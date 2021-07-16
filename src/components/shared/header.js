import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { locationCoords } from '../../store/actions/location';
import Icon from 'react-native-vector-icons/MaterialIcons';

const iconLocation = require('./../../assets/images/home/location.png');
import { Typography, Colors } from '../../styles';

import { useRoute, useNavigationState } from '@react-navigation/native';

const HeaderIcon = ({ navigation, color }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  if (color) {
    return (
      <Icon
        name="menu"
        size={32}
        color={color}
        style={styles.iconHeader}
        onPress={openMenu}
      />
    );
  }
  return <Icon name="menu" size={28} style={styles.icon} onPress={openMenu} />;
};

const HeaderBack = ({ navigation, change }) => {
  const route = useRoute();
  const routes = useNavigationState(state => state.routes);

  const back = () => {
    try {
      if (routes.length > 0) {
        console.log(routes[0].name);
        console.log(routes.name);
      }
      if (
        routes.length > 0 &&
        (routes[0].name === 'PaymentStatus' && route.name === 'MyOrder')
      ) {
        navigation.navigate('Home', { screen: 'Home' });
      } else if (
        (routes[0].name === 'RestaurantProduct' &&
          route.name === 'Restaurant') ||
        routes[0].name === 'Product'
      ) {
        navigation.navigate('Home', { screen: 'Home' });
      } else {
        navigation.goBack(null);
      }
    } catch (err) {
      console.log('Fail goBack');
    }
  };

  return change ? (
    <Icon
      name="navigate-before"
      size={40}
      color={Colors.GRAY_DARK}
      onPress={() => back()}
    />
  ) : (
      <Icon
        name="navigate-before"
        size={35}
        style={styles.icon}
        onPress={() => back()}
      />
    );
};

const HeaderBackOrder = ({ navigation, change }) => {
  const back = () => {
    try {
      navigation.navigate('Shopping', {
        screen: 'MyOrder',
      });
    } catch (err) {
      console.log('Fail goBack');
    }
  };

  return change ? (
    <Icon
      name="navigate-before"
      size={30}
      color={Colors.GRAY_DARK}
      onPress={() => back()}
    />
  ) : (
      <Icon
        name="navigate-before"
        size={30}
        style={styles.icon}
        onPress={() => back()}
      />
    );
};

const ContentHeaderTitle = ({ title, subTitle, address }) => {
  if (address && address !== null && address.length > 5) {
    try {
      address = address.substr(0, 20).split(' - ', 1)[0];
    } catch (err) {
      address = address.substr(0, 20);
    }
  }

  return (
    <View style={styles.header}>
      {address === null ? (
        <>
          <Text style={styles.headerText}>{title}</Text>
          {subTitle != null && (
            <Text style={styles.headerSubTitle}>{subTitle}</Text>
          )}
        </>
      ) : (
          <View style={styles.addresContainer}>
            <Text style={styles.headerText}>{address}</Text>
            <View>
              <Icon name="place" size={20} style={styles.icon} />
            </View>
          </View>
        )}
    </View>
  );
};

const HeaderTitle = connect(({ user }) => {
  return { address: user.addres };
})(ContentHeaderTitle);

const HeaderTitleWhite = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTxtBlue}>{title}</Text>
    </View>
  );
};

const ContentLocation = ({ navigation, address, coords, onLocation }) => {
  /*
  if (address.length > 5) {
    address = address.substr(0, 5) + '...';
  }
  */

  onLocation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Location')}
      style={styles.locationContainer}>
      {coords && coords !== false && (
        <>
          {/*<Text style={styles.txtLocation}>{coords.latitude}</Text>*/}
          <Image source={iconLocation} height={20} />
        </>
      )}
    </TouchableOpacity>
  );
};

const HeaderLocation = connect(
  ({ location }) => {
    return {
      coords: location.coords,
    };
  },
  dispatch => {
    return {
      onLocation: () => dispatch(locationCoords()),
    };
  },
)(ContentLocation);

export {
  HeaderIcon,
  HeaderBack,
  HeaderBackOrder,
  HeaderTitle,
  HeaderTitleWhite,
  HeaderLocation,
};

const styles = StyleSheet.create({
  header: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  headerTxtBlue: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  headerSubTitle: {
    fontSize: Typography.FONT_SIZE_18,
    color: '#FFFF03',
    marginLeft: 5,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  icon: {
    color: Colors.WHITE,
    //left: 10,
    position: 'absolute',
    padding: 10,
  },
  iconHeader: {
    marginLeft: 19,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  txtLocation: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    marginRight: 10,
  },
  addresContainer: {
    flexDirection: 'row',
  },
});
