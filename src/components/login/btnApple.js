import React from 'react';
import {Typography, Colors} from '../../styles';
import {Image, TouchableOpacity, StyleSheet, Text} from 'react-native';

import signInApple from '../../services/appleLogin';

export default function BtnApple({navigation, onPress}) {
  const iconApple = require('../../assets/images/login/apple.png');

  const signIn = async () => {
    await signInApple(onPress);
  };

  return (
    <TouchableOpacity style={styles.appleBtn} onPress={() => signIn()}>
      <Image
        style={styles.nationalityIcon}
        resizeMode="contain"
        source={iconApple}
      />
      {/* <Text style={styles.text}>Entrar com a Apple</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appleBtn: {
    // margin: 5,
    // borderRadius: 7,
    // borderWidth: 0.3,
    // borderColor: Colors.GREY_LIGHT,
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: Colors.WHITE,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // height: 42,
    // width: '100%',
  },
  nationalityIcon: {
    width: 50,
    height: 50,
    margin: 10,
  },
  text: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.BLACK,
    marginRight: 10,
  },
});
