import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

export default function CouponRules({navigation, route}) {
  const [coupon, setCupon] = useState([]);

  useEffect(() => {
    const couponParam = route.params?.coupon ?? null;
    setCupon(couponParam);
  }, [route.params]);

  const goBack = () => {
    navigation.navigate('Home', {screen: 'Home'});
  };

  const goCoupons = () => {
    navigation.navigate('Shopping', {screen: 'Coupon'});
  };

  const goRestaurants = () => {
    navigation.navigate('Restaurant', {
      screen: 'Restaurant',
      params: {
        coupon,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="navigate-before" size={40} style={styles.IconBefore} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Regras</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.txtHeader}>{coupon.name}</Text>
        <Text style={styles.txtRules}>{coupon.rules}</Text>
        <TouchableOpacity
          style={styles.coupomView}
          onPress={() => goRestaurants()}>
          <Text style={styles.restaurants}>Ver Restaurantes</Text>
        </TouchableOpacity>
        <Text style={styles.coupomTxtExpire}>
          {`Válido até ${moment(coupon.dateFinish, 'YYYY/MM/DD').format(
            'DD',
          )}/${moment(coupon.dateFinish, 'YYYY/MM/DD').format('MM')}`}
        </Text>
        <TouchableOpacity onPress={() => goCoupons()}>
          <Text style={styles.myCoupons}>Ir para meus cupons</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
