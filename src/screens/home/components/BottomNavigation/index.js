/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './styles';

const BottomNavigation = ({ goInitialPositionList }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const itensNavigation = [
    {
      id: 3,
      icone: require('./images/home.png'),
      title: 'Home',
      page: 'Home',
      screen: 'Home',
    },
    {
      id: 1,
      icone: require('./images/search.png'),
      title: 'Busca',
      page: 'Search',
    },
    {
      id: 2,
      icone: require('./images/cart.png'),
      title: 'Pedidos',
      page: 'Shopping',
      screen: 'MyOrder',
    },
  ];

  const goScreen = (page, screen) => {
    console.log(page, screen);

    if (page === 'Home') {
      goInitialPositionList();
    }
    if (screen) {
      return navigation.navigate(page, {
        screen,
      });
    }

    navigation.navigate(page);
  };

  return (
    <View
      style={[
        styles.BoxNavigation,
        { paddingBottom: insets.bottom > 0 ? insets.bottom : 10 },
      ]}>
      {itensNavigation.map(item => (
        <TouchableOpacity
          onPress={() => goScreen(item.page, item.screen)}
          style={styles.BoxScreens}
          key={item.id}>
          <Image
            source={item.icone}
            style={styles.Icon}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Text style={styles.Text}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavigation;
