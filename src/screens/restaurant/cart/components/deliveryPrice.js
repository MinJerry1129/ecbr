import React from 'react';
import {Text, ActivityIndicator, View} from 'react-native';
import {formatMoney} from '../../../../utils/index';
import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../../styles';

export default function deliveryPrice(deliveryFee) {
  if (deliveryFee === undefined || deliveryFee === null) {
    return null;
  }

  let retorno = 'Grátis';

  if (deliveryFee > 0) {
    retorno = `${formatMoney(deliveryFee)}`;
  }

  return (
    <View style={styles.listSub}>
      <Text style={styles.subTitle}>Taxa de Entrega</Text>
      {deliveryFee >= 0 ? (
        <Text style={deliveryFee > 0 ? styles.subPrice : styles.subPriceFree}>
          {retorno}
        </Text>
      ) : (
        <ActivityIndicator
          color={Colors.PRIMARY}
          size="small"
          style={{width: 15, height: 15}}
        />
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  listSub: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  subTitle: {
    flex: 2,
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.GREY,
  },
  subPrice: {
    flex: 1,
    textAlign: 'right',
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  subPriceFree: {
    flex: 1,
    textAlign: 'right',
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.SUCCESS,
  },
});
