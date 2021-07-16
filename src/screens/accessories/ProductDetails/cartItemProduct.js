/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Colors, Typography } from '../../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatMoney } from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';

const CartItemProduct = ({
  onPress,
  add,
  remove,
  qtd,
  total,
  addOK,
  disposed,
}) => {
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setDisable(disableAdd());
  }, [addOK]);

  const priceCart = () => {
    if (!total || total < 0) {
      return 'R$ 0,00';
    } else {
      return formatMoney(total);
    }
  };

  const disableAdd = () => {
    if (addOK && addOK.status === true) {
      return false;
    } else {
      return true;
    }
  };

  const messageDisabled = () => {
    Alert.alert(addOK.title, addOK.message);
  };

  return (
    <SafeAreaView>
      {disposed ? (
        <View style={styles.checkout}>
          <View style={styles.containerQtd}>
            <TouchableOpacity
              style={styles.btQtd}
              onPress={() => remove(qtd - 1)}>
              <Icon name="remove" style={styles.btQtdIcon} />
            </TouchableOpacity>
            <Text style={styles.txtQtd}>{qtd}</Text>
            <TouchableOpacity style={styles.btQtd} onPress={() => add(qtd + 1)}>
              <Icon name="add" style={styles.btQtdIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerQtdAdd}>
            <TouchableOpacity
              style={styles.btnCheckoutTouch}
              onPress={() => (disable ? messageDisabled() : onPress(qtd))}>
              <LinearGradient
                colors={['#00c0f3', '#1880d0']}
                style={[
                  styles.btnCheckout,
                  !disable ? styles.btnDisable : null,
                ]}>
                <Text style={styles.txtCheckout}>Adicionar</Text>
                <Text
                  style={[styles.txtBtn, disable ? null : styles.colorWhite]}>
                  {priceCart()}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default React.memo(CartItemProduct);

const styles = StyleSheet.create({
  checkout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: Colors.GRAY_LIGHT,
    paddingHorizontal: '3%',
    marginBottom: 5,
  },
  checkoutText: {
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  btnCheckoutTouch: {
    flex: 1,
    borderRadius: 5,
    alignContent: 'center',
    flexDirection: 'row',
  },
  btnCheckout: {
    flex: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    // borderTopRightRadius: 10,
    // paddingHorizontal: 40,
    // paddingVertical: 15,
  },
  txtCheckout: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    marginLeft: 15,
    justifyContent: 'center',
  },
  containerQtd: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingVertical: 12,
    borderColor: Colors.GRAY_MEDIUM,
    backgroundColor: Colors.WHITE,
  },
  containerQtdAdd: {
    flex: 2,
    alignItems: 'center',
    marginLeft: 8,
  },
  txtQtd: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    paddingHorizontal: 20,
  },
  txtBtn: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    color: Colors.WHITE,
    textAlignVertical: 'center',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
  },
  btQtd: {
    flex: 1,
    // marginLeft: 10,
  },
  btQtdIcon: {
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: 24,
    color: Colors.PRIMARY,
  },
});
