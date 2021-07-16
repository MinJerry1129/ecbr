import React from 'react';

import {Container, ViewTotals, Totals, Text} from './Styles';

import {formatMoney} from '../../../../utils';

const totals = ({
  cart,
  coupon,
  serviceCharge,
  deliveryFee,
  tip,
  typeSchedule,
}) => {
  const getSubTotal = () => {
    return cart.reduce(
      (accumulator, product) => accumulator + product.price * product.amount,
      0,
    );
  };

  const getDiscount = () => {
    return cart.reduce((accumulator, product) => {
      let discount = 0;

      if (product.pricePromotion && product.pricePromotion > 0) {
        discount = product.price - product.pricePromotion;
      }

      if (product.amount && product.amount > 1) {
        discount = discount * product.amount;
      }

      return accumulator + discount;
    }, 0);
  };

  const getCouponPrice = () => {
    if (!coupon || !coupon.price) {
      return 0;
    }

    return coupon.price;
  };

  return (
    <Container>
      <ViewTotals>
        <Totals>
          <Text>SubTotal:</Text>
          <Text>{formatMoney(getSubTotal())}</Text>
        </Totals>
        <Totals>
          <Text>Gorjeta:</Text>
          <Text>{formatMoney(tip)}</Text>
        </Totals>
        <Totals>
          <Text>Taxa de entrega:</Text>
          <Text isFree={typeSchedule !== 'DELIVERY'}>
            {typeSchedule === 'DELIVERY' ? formatMoney(deliveryFee) : 'Grátis'}
          </Text>
        </Totals>
        <Totals>
          <Text>Taxa de serviço:</Text>
          <Text>{formatMoney(serviceCharge)}</Text>
        </Totals>
        <Totals>
          <Text discount={true}>Descontos:</Text>
          <Text discount={true}>- {formatMoney(getDiscount())}</Text>
        </Totals>
        <Totals>
          <Text discount={true}>Cupons:</Text>
          <Text discount={true}>- {formatMoney(getCouponPrice())}</Text>
        </Totals>
      </ViewTotals>
    </Container>
  );
};

export default totals;
