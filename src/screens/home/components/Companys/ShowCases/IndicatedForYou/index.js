import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {isAuthenticated} from '../../../../../../services/userAuth';
import {seacrhDeliveryAddress} from '../../../../../../services/service/delivery/address';
import {listCompany} from '../../../../../../services/service/company';

import {fixedNumbers} from '../../components/functions';

import styles from '../../styles';
import stylesIndicated from './styles';

const IndicatedForYou = ({hr}) => {
  const [orders, setOrders] = useState([]);

  const navigation = useNavigation();
  const bike = require('../../images/bike.png');
  const hrActive = hr !== false ? true : false;

  const getAddressAndRedirectOurShow = useCallback(async () => {
    const {user} = await isAuthenticated();

    const addressMain = await seacrhDeliveryAddress({
      customer: user._id,
      main: true,
    });

    if (!addressMain || addressMain.length <= 0) {
      return;
    }

    listCompanys(addressMain[0]);
  }, [listCompanys]);

  const listCompanys = useCallback(async address => {
    const location = address.location.coordinates;

    const getListCompanys = await listCompany({
      delivery: true,
      latitude: location[1],
      longitude: location[0],
    });

    if (getListCompanys && getListCompanys.length > 0) {
      setOrders(getListCompanys);
    }
  }, []);

  const goProducts = (item, type) => {
    if (String(type).toLowerCase() === 'restaurant') {
      return navigation.navigate('Restaurant', {
        screen: 'RestaurantProduct',
        params: {
          company: item,
        },
      });
    }

    navigation.navigate('Supermarket', {
      screen: 'Product',
      params: {
        company: item,
      },
    });
  };

  useEffect(() => {
    getAddressAndRedirectOurShow();
  }, [getAddressAndRedirectOurShow]);

  return orders && Object.keys(orders).length > 0 ? (
    <View style={stylesIndicated.BoxIndicated}>
      <Text style={styles.Title}>Indicados para você</Text>
      {orders.map(order =>
        order.companyDelivery.isOpen ? (
          <TouchableOpacity
            style={[styles.BoxCompany, stylesIndicated.BoxMax]}
            key={order._id}
            onPress={() => goProducts(order, order.type)}>
            <FastImage
              source={{
                uri: order.groups.images[0],
                priority: FastImage.priority.normal,
              }}
              style={styles.Brand}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={stylesIndicated.content}>
              <Text style={styles.CompanyName} numberOfLines={1}>
                {order.groups.name}
              </Text>
              <View style={styles.BoxInfoCompany}>
                <Text style={styles.textKm}>
                  • {fixedNumbers(order.distanceUser, 1)} km •
                </Text>
                <Text style={styles.InfoCompanyText}>
                  Aprox. {order.companyDelivery.distance[0].delivery_time}min
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null,
      )}
      {hrActive ? <View style={styles.hr} /> : null}
    </View>
  ) : null;
};

export default IndicatedForYou;
