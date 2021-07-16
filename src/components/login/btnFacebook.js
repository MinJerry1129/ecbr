import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {signInFacebook} from '../../services/facebookLogin';

export default function BtnFacebook({navigation, onPress}) {
  const iconFace = require('../../assets/images/login/facebook.png');

  const signIn = async () => {
    await signInFacebook(onPress);
  };

  return (
    <TouchableOpacity style={styles.faceBtn} onPress={() => signIn()}>
      <Image
        style={styles.nationalityIcon}
        resizeMode="contain"
        source={iconFace}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  faceBtn: {
    margin: 5,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#385398',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  nationalityIcon: {
    width: 56,
    height: 55,
  },
});
