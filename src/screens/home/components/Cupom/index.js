import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import moment from 'moment';

import {listCoupons} from '../../../../services/service/coupon/list';
import {isAuthenticated} from '../../../../services/userAuth';

import styles from './styles';

const Cupom = () => {
  const navigation = useNavigation();
  const [coupons, setCoupons] = useState([]);

  const getListCoupon = async () => {
    const {user: userAuth} = await isAuthenticated();
    const couponResult = await listCoupons({
      status: true,
      person: userAuth.person?._id,
    });

    if (couponResult) {
      setCoupons(couponResult);
    }
  };

  const goCouponScreen = () => {
    navigation.navigate('Shopping', {
      screen: 'Coupon',
      params: {
        notCoupon: false,
      },
    });
  };

  useEffect(() => {
    getListCoupon();
  }, []);

  return coupons && coupons.length > 0 ? (
    <TouchableOpacity style={styles.BoxCupom} onPress={() => goCouponScreen()}>
      <Image source={require('./images/cupom.png')} style={styles.icon} />
      {coupons.length > 1 ? (
        <View>
          <Text style={styles.Title}>{coupons.length} cupons disponíveis</Text>
          <Text style={styles.Description}>clique aqui</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.Title}>Cupom disponível</Text>
          <Text style={styles.Description}>
            R${coupons[0].price} de desconto
          </Text>
        </View>
      )}
    </TouchableOpacity>
  ) : null;
};

export default Cupom;
