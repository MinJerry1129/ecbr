/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Typography } from '../../styles';
import { formatMoney } from '../../utils';

const CardCoupon = ({
  company,
  navigation,
  subTotal,
  coupons,
  cupom,
  firstOrder,
}) => {
  const goCoupons = () => {
    let type;
    let screen;

    if (company.type === 'supermarket') {
      type = 'Supermarket';
      screen = 'Product';
    } else {
      type = 'Restaurant';
      screen = 'RestaurantProduct';
    }

    navigation.navigate('Shopping', {
      screen: 'Coupon',
      params: {
        pageRedirect: [type, screen],
        company,
        subTotal,
        openCart: true,
        notCoupon: true,
        firstOrder,
      },
    });
  };

  const getMessage = allCoupons => {
    if (allCoupons.available && allCoupons.available.length > 0) {
      return `${allCoupons.available.length} ${
        allCoupons.available.length === 1 ? 'disponível' : 'disponíveis'
        }`;
    }

    if (allCoupons.blocked && allCoupons.blocked.length > 0) {
      return `${allCoupons.blocked.length} ${
        allCoupons.blocked.length === 1 ? 'bloqueado' : 'bloqueados'
        }`;
    }
  };

  return (
    <TouchableOpacity style={styles.contantAmount} onPress={() => goCoupons()}>
      {cupom ? (
        <>
          <View style={styles.boxCupom}>
            <Icon name="confirmation-number" size={40} color={Colors.PRIMARY} />
            <View style={styles.boxCupomInfo}>
              <Text style={styles.txtAmount}>
                Cupom de {formatMoney(cupom)}
              </Text>
              <Text style={styles.txtInfo}>Cupom aplicado</Text>
            </View>
          </View>
          <Text style={styles.buttonAction}>Trocar</Text>
        </>
      ) : (
          <>
            <View style={styles.boxCupom}>
              <Icon
                name="confirmation-number"
                size={40}
                color={Colors.GRAY_DARK}
              />
              <View style={styles.boxCupomInfo}>
                <Text style={styles.txtAmount}>Cupom</Text>
                <Text style={styles.txtInfo}>{getMessage(coupons)}</Text>
              </View>
            </View>
            <Text style={styles.buttonAction}>Adicionar</Text>
          </>
        )}
    </TouchableOpacity>
  );
};

export default CardCoupon;

const styles = StyleSheet.create({
  contantAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 6,
  },
  boxCupom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxCupomInfo: {
    marginLeft: 10,
  },
  txtAmount: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    fontWeight: '700',
    color: Colors.DARK,
  },
  txtInfo: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: '200',
    color: Colors.DARK_LIGHT,
  },
  buttonAction: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
});
