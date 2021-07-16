import React, {useEffect} from 'react';
import {Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Typography, Colors} from '../../styles';

import {googleConfigure, signInGoogle} from '../../utils/loginGoogle';

export default function BtnGoogle({navigation, onPress}) {
  const iconGoogle = require('../../assets/images/login/google.png');

  useEffect(() => {
    googleConfigure();
  }, []);

  const signIn = () => {
    signInGoogle(onPress);
  };

  return (
    <TouchableOpacity style={styles.googleBtn} onPress={() => signIn()}>
      <Image
        style={styles.nationalityIcon}
        resizeMode="stretch"
        source={iconGoogle}
      />
      {/* <Text style={styles.text}>Entrar com Google</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleBtn: {
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
