/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import { Animated, Alert } from 'react-native';

import {
  Container,
  ViewHeader,
  ViweTextHeader,
  TextHeader,
  Image,
  TextRules,
  ViewValidStore,
  TextValidStore,
  ViewFooter,
  TouchHowUse,
  TextHowUse,
  ImageGoBack,
} from './Styles';
import { formatDate } from '../../../../utils';

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
  const close = require('./images/goBack.png');
  const icon = require('../../../../assets/images/coupon/coupon.png');

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
    <Container
      isRules={isRules}
      disabled={!company}
      onPress={() => goBackCoupon(coupon)}>
      <ViewHeader>
        <ViweTextHeader>
          <TextHeader isValid={!cardDisabled(coupon)}>
            {coupon?.name}
          </TextHeader>
        </ViweTextHeader>
        <Image source={icon} resizeMode="contain" />
      </ViewHeader>
      <TextRules>
        Válido para compras acima de R$ {coupon?.minPriceDelivery}
      </TextRules>
      <ViewValidStore
        isValid={!cardDisabled(coupon)}
        onPress={() => goCompanies()}>
        <TextValidStore isValid={!cardDisabled(coupon)}>
          Lojas válidas
        </TextValidStore>
      </ViewValidStore>
      <Animated.View>
        {isRules ? <TextRules>{coupon?.description}</TextRules> : null}
      </Animated.View>
      <ViewFooter>
        <TextValidStore isFooter={true}>
          Válido até {formatDate(coupon.dateFinish, 'DD/MM')}
        </TextValidStore>
        <TouchHowUse onPress={() => startAnimated()}>
          {isRules ? (
            <ImageGoBack source={close} resizeMode="contain" />
          ) : (
              <TextHowUse>Como usar</TextHowUse>
            )}
        </TouchHowUse>
      </ViewFooter>
    </Container>
  );
};

export default CardCoupon;
