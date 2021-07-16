import React from 'react';

import {
  Header,
  HeaderBody,
  TextHeader,
  Image,
  Body,
  ViewPayment,
  TouchChange,
  TextChange,
} from './Style';

import CardTypePayment from '../cardTypePayment';
import MoneyTypePayment from '../moneyTypePayment';
import imgPaymentType from './images/paymentType.png';
import FinanceTypePayment from '../financeTypePayment';

const typePayment = ({
  paymentType,
  card,
  changeMoney,
  navigation,
  company,
  total,
  typeCard,
}) => {
  const goPaymentMethods = () => {
    navigation.navigate('PaymentMethods', {
      redirectPayment: true,
      newRegister: false,
      company,
      total,
    });
  };

  return (
    <>
      <Header>
        <HeaderBody>
          <TextHeader>Forma de pagamento</TextHeader>
          <Image source={imgPaymentType} />
        </HeaderBody>
      </Header>
      <Body>
        <ViewPayment>
          <CardTypePayment
            card={card}
            typeCard={typeCard}
            paymentType={paymentType}
          />
          <MoneyTypePayment
            changeMoney={changeMoney}
            paymentType={paymentType}
          />
          <FinanceTypePayment
            navigation={navigation}
            paymentType={paymentType}
          />
        </ViewPayment>
        <TouchChange onPress={() => goPaymentMethods()}>
          <TextChange>Trocar</TextChange>
        </TouchChange>
      </Body>
    </>
  );
};

export default typePayment;
