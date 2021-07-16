import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { ViewHeader, StatusBar, styles, TextHeader } from './Styles';

const header = ({ navigation, params, company, coupon }) => {
  const goBack = () => {
    try {
      navigation.navigate(params[0], {
        screen: params[1],
        params: {
          company: company,
          openCart: true,
          coupon,
        },
      });
    } catch (err) {
      console.log('Erro', err);
      navigation.navigate('Home', { screen: 'Home' });
    }
  };

  return (
    <ViewHeader>
      <StatusBar barStyle="dark-content" />
      <Icon
        name="navigate-before"
        size={45}
        style={styles.icon}
        onPress={() => goBack()}
      />
      <TextHeader>COMPRA</TextHeader>
    </ViewHeader>
  );
};

export default header;
