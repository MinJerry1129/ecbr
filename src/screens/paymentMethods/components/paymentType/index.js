import React from 'react';

import {
  TextTitle,
  ViewTitle,
  ViewBox,
  TouchItem,
  ViewItem,
  TextItem,
  ImageCreditCard,
  ImageMoney,
  ImageLocalPayment,
  ImageIcon,
} from './Styles';

import Money from './images/money.png';
import LocalCard from './images/localCard.png';
import CreditCard from './images/creditCard.png';
import NavigateNext from './images/navigateNext.png';

const PaymentType = ({
  typePayments,
  setLoadMethod,
  setModalPaymentMoney,
  setModalLocalCreditCard,
}) => {
  return (
    <>
      <ViewTitle>
        <TextTitle>Adicionar forma de pagamento</TextTitle>
      </ViewTitle>
      <ViewBox>
        {(!typePayments ||
          (typePayments && typePayments.length === 0) ||
          typePayments?.BRASPAG) && (
            <TouchItem onPress={() => setLoadMethod(true)}>
              <ViewItem>
                <ImageCreditCard source={CreditCard} resizeMode="contain" />
                <TextItem>Cartão de Crédito</TextItem>
              </ViewItem>
              <ImageIcon source={NavigateNext} />
            </TouchItem>
          )}
        {typePayments?.MONEY && (
          <TouchItem onPress={() => setModalPaymentMoney(true)}>
            <ViewItem>
              <ImageMoney source={Money} resizeMode="contain" />
              <TextItem>Pagar com dinheiro</TextItem>
            </ViewItem>
            <ImageIcon source={NavigateNext} />
          </TouchItem>
        )}
        {typePayments?.CARD && (
          <TouchItem onPress={() => setModalLocalCreditCard(true)}>
            <ViewItem>
              <ImageLocalPayment source={LocalCard} resizeMode="contain" />
              <TextItem>Cartão no local</TextItem>
            </ViewItem>
            <ImageIcon source={NavigateNext} />
          </TouchItem>
        )}
      </ViewBox>
    </>
  );
};

export default PaymentType;
