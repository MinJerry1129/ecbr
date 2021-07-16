import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  Container,
  ViewText,
  TextHeader,
  TouchLink,
  TextLink,
  Image,
} from './Styles';

import { isAuthenticated } from '../../../../../services/userAuth';
import { listOrderCustomer } from '../../../../../services/service/shopping/order';

const Coupon = ({ coupons, company, navigation, subTotal }) => {
  const icon = require('../../../../../assets/images/coupon/coupon.png');
  const [firstOrder, setFirstOrder] = useState(false);

  if (!coupons || coupons?.length === 0) {
    return null;
  }

  useFocusEffect(
    useCallback(() => {
      const orderCustomer = async () => {
        const { user: userAuth } = await isAuthenticated();

        const result = await listOrderCustomer(userAuth._id);

        setFirstOrder(!result.result);
      };
      orderCustomer();
    }, []),
  );

  const goCoupons = () => {
    navigation.navigate('Shopping', {
      screen: 'Coupon',
      params: {
        pageRedirect: ['Supermarket', 'Product'],
        company,
        subTotal,
        openCart: true,
        notCoupon: true,
        firstOrder,
      },
    });
  };

  return (
    <Container>
      <ViewText>
        <TextHeader>Cupom disponível</TextHeader>
        <TouchLink onPress={() => goCoupons()}>
          <TextLink>Adicionar</TextLink>
        </TouchLink>
      </ViewText>
      <Image source={icon} resizeMode="contain" />
    </Container>
  );
};

export default Coupon;
