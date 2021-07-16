import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Colors } from '../../../../styles';

const ModalDetail = () => {
  const logo = require('../../../../assets/images/logo_splash.png');

  return (
    <View style={styles.container}>
      <Image style={styles.logo} resizeMode="contain" source={logo} />
    </View>
  );
};

export default ModalDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
});
