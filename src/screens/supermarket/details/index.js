/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { Colors } from '../../../styles';

import { seacrhDeliveryAddress } from '../../../services/service/delivery/address';
import { listHours } from '../../../services/service/company/hours';
import { listOneGuest } from '../../../services/service/customer';
import { isAuthenticated } from '../../../services/userAuth';
import { listTypePaymentsCompanyDelivery } from '../../../services/service/finance';

import InfoDelivery from './components/infoDelivery';
import AddressDelivery from './components/addressDelivery';
import OpeningHours from './components/openingHours';
import PaymentMethods from './components/paymentMethods';

const SupermarketDetails = ({ navigation, route }) => {
  const imgHeader = require('../../../assets/images/product/background.jpg');
  const [company, setCompany] = useState({});
  const [address, setAddreess] = useState({});
  const [guestAddress, setGuestAddress] = useState({});
  const [openingHours, setOpeningHours] = useState({});
  const [typePayments, setTypePayments] = useState({});

  useEffect(() => {
    const onLoad = async () => {
      const companyParam = route.params?.company ?? null;
      setCompany(companyParam);
      const { user: userAuth, guest: guest } = await isAuthenticated();

      const addressMain = await seacrhDeliveryAddress({
        customer: userAuth._id,
        main: true,
      });

      setAddreess(addressMain);

      if (guest && guest === true) {
        const result = await listOneGuest(userAuth.device);
        setGuestAddress(result);
      }

      const hours = await listHours(companyParam._id);

      if (hours.data && hours.data.length > 0) {
        setOpeningHours(hours.data);
      }

      const resutlTypePayments = await listTypePaymentsCompanyDelivery(
        companyParam.companyDelivery._id,
      );

      console.log('resutlTypePayments', resutlTypePayments);

      if (resutlTypePayments && resutlTypePayments.length > 0) {
        setTypePayments(resutlTypePayments);
      }
    };

    onLoad();
  }, []);

  const goBack = () => {
    let stack;
    let screen;

    if (company.type === 'restaurant') {
      stack = 'Restaurant';
      screen = 'RestaurantProduct';
    } else {
      stack = 'Supermarket';
      screen = 'Product';
    }

    navigation.navigate(stack, {
      screen: screen,
      params: { company },
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imgBackground} source={imgHeader}>
        <View style={styles.BoxCompany}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon name="navigate-before" size={40} color={Colors.WHITE} />
          </TouchableOpacity>
          {company && company.images && (
            <View style={styles.BoxLogo}>
              <Image
                style={styles.logo}
                source={{ uri: company.images[0] }}
                resizeMode="contain"
              />
            </View>
          )}
          <Text style={styles.TitleCompany} numberOfLines={1}>
            {company && company.name && company.name.length > 0
              ? `${company.name}`
              : '-'}
          </Text>
        </View>
      </ImageBackground>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          {InfoDelivery(company, navigation, address, guestAddress)}
          {AddressDelivery(company.address)}
          {OpeningHours(openingHours)}
          {PaymentMethods(typePayments)}
        </View>
      </ScrollView>
    </View>
  );
};

export default SupermarketDetails;
