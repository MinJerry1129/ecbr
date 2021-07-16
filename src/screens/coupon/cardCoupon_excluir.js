/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Typography } from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';
import { formatDate } from '../../../utils';

const CardCoupon = ({
  coupon,
  company,
  params,
  navigation,
  subTotal,
  firstOrder,
}) => {
  const [isRules, setIsRules] = useState(false);

  const animatedValue = new Animated.Value(0);
  const animatedValueRef = useRef(animatedValue);

  const startAnimated = () => {
    if (isRules) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
      }).start(() => {
        animatedValueRef.current = 0;
        setIsRules(false);
      });
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
      }).start(() => {
        animatedValueRef.current = 1;
        setIsRules(true);
      });
    }
  };

  const alterDisabled = () => {
    if (!company) {
      return false;
    }

    const numberOfTimesUsed =
      coupon.couponCustomer?.length > 0 &&
        coupon.couponCustomer[0].numberOfTimesUsed
        ? coupon.couponCustomer[0].numberOfTimesUsed
        : 0;

    if (subTotal < coupon.minPriceDelivery) {
      Alert.alert(
        'Selecione mais itens para alcançar o valor mínimo.',
        'Valor do pedido menor do que o valor mínimo solicitado pelo cupom.',
      );

      return true;
    }

    if (coupon.limit <= numberOfTimesUsed) {
      Alert.alert('OPS!', 'Esse cupom se esgotou.');

      return true;
    }

    if (coupon.onlyFirstPurchase && !firstOrder) {
      Alert.alert('OPS!', 'Cupom disponível apenas para a primeira compra.');

      return true;
    }

    return false;
  };

  const goBackCoupon = () => {
    if (alterDisabled()) {
      return;
    }

    if (!params || !company) {
      return;
    }

    navigation.navigate(params[0], {
      screen: params[1],
      params: {
        company: company,
        openCart: true,
        coupon,
      },
    });
  };

  const goCompanies = () => {
    navigation.navigate('CompaniesCoupon', {
      screen: 'CompaniesCoupon',
      params: {
        coupon,
      },
    });
  };

  const cardDisabled = item => {
    const numberOfTimesUsed =
      item.couponCustomer?.length > 0 &&
        item.couponCustomer[0].numberOfTimesUsed
        ? item.couponCustomer[0].numberOfTimesUsed
        : 0;

    if (
      (company && subTotal && subTotal < item?.minPriceDelivery) ||
      item.limit <= numberOfTimesUsed ||
      (item.onlyFirstPurchase && !firstOrder)
    ) {
      return true;
    } else {
      false;
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        disabled={!company}
        onPress={() => goBackCoupon(coupon)}>
        <View style={styles.contantAmount}>
          <View style={styles.contentIcon}>
            <Icon
              name="confirmation-number"
              size={40}
              color={cardDisabled(coupon) ? Colors.DARK_LIGHT : Colors.PRIMARY}
            />
          </View>
          <Text style={styles.txtAmount}>{coupon?.name}</Text>
        </View>
        <Text style={styles.txtInfo}>
          Válido para compras acima de R$ {coupon?.minPriceDelivery}
        </Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          opacity: animatedValueRef.current,
          margin: 5,
          borderRadius: 12,
          justifyContent: 'center',
        }}>
        {isRules ? (
          <Text style={styles.derscription}>{coupon?.description}</Text>
        ) : null}
      </Animated.View>

      {params ? (
        <TouchableOpacity
          style={
            cardDisabled(coupon)
              ? styles.clickCouponDisable
              : styles.clickCoupon
          }
          onPress={() => goBackCoupon()}>
          <Text style={styles.couponCurrent}>Utilizar Cupom</Text>
        </TouchableOpacity>
      ) : isRules === false ? (
        <View style={styles.options}>
          <TouchableOpacity onPress={() => startAnimated()}>
            <Text style={styles.optionsOne}>Veja como usar</Text>
          </TouchableOpacity>
          <View style={styles.contentOptionTwo}>
            <Icon name="info" size={25} color={Colors.PRIMARY} />
            <Text style={styles.txtOptionTwo}>
              Válido até {formatDate(coupon.dateFinish, 'DD/MM')}
            </Text>
          </View>
        </View>
      ) : (
            <View style={styles.optionsShow}>
              <TouchableOpacity
                onPress={() => startAnimated()}
                style={styles.containerIconShow}>
                <Icon name="expand-less" size={40} color={Colors.PRIMARY} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionShowTwo}
                onPress={() => goCompanies()}>
                <LinearGradient
                  colors={['#00c0f3', Colors.PRIMARY]}
                  style={styles.btnCart}>
                  <Text style={styles.btnText}>Lojas Válidas</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
    </View>
  );
};

export default CardCoupon;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  contantAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentIcon: {},
  txtAmount: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    fontWeight: '700',
    color: Colors.DARK_LIGHT,
    marginLeft: 10,
  },
  txtInfo: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: '200',
    color: Colors.DARK_LIGHT,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.DARK,
    paddingBottom: 10,
  },
  options: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    marginTop: 10,
    marginBottom: -20,
    paddingVertical: 15,
    justifyContent: 'space-around',
    marginHorizontal: -10,
    borderRadius: 10,
  },
  optionsOne: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.PRIMARY,
  },
  contentOptionTwo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtOptionTwo: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.DARK,
  },
  optionsShow: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    marginTop: 10,
    marginBottom: -20,
    paddingVertical: 15,
    justifyContent: 'space-between',
    marginHorizontal: -10,
    borderRadius: 10,
  },
  containerIconShow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionShowTwo: {
    marginRight: 10,
  },
  btnCart: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.WHITE,
  },
  derscription: {
    marginTop: 10,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK,
    fontWeight: '500',
  },
  clickCoupon: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickCouponDisable: {
    backgroundColor: Colors.DARK_LIGHT,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponCurrent: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
});
