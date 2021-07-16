import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Typography } from '../../styles';

const CardOptions = ({ status, onActive, onInactive }) => {
  const active = () => {
    onActive(true);
  };

  const inactive = () => {
    onInactive(false);
  };

  return (
    <View style={styles.cartBtnContainer}>
      <TouchableOpacity
        onPress={() => active()}
        style={[styles.cartBtn, status ? styles.cartBtnBlue : null]}>
        <Text style={[status ? styles.txtcartBtnBlue : styles.txtcartBtnWhite]}>
          Ativo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => inactive()}
        style={[styles.cartBtn, !status ? styles.cartBtnBlue : null]}>
        <Text
          style={[!status ? styles.txtcartBtnBlue : styles.txtcartBtnWhite]}>
          Indisponível
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardOptions;

const styles = StyleSheet.create({
  cartBtnContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  cartBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0.5,
    paddingVertical: 10,
  },
  cartBtnBlue: {
    backgroundColor: Colors.PRIMARY,
  },
  txtcartBtnBlue: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtcartBtnWhite: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
});
