import React from 'react';

import {
  Container,
  ViewTotalsHorizontal,
  ViewTotalVertical,
  ViewLineTotal,
  TextTotals,
} from './Styles';

import { formatMoney } from '../../../../../utils';

const Totals = ({ cart, subTotal, coupon, serviceCharge, deliveryPrice }) => {
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

  const getTotal = () => {
    let value = subTotal;

    const discount = getDiscount();

    if (discount > 0) {
      value += discount;
    }

    return formatMoney(value);
  };

  return (
    <Container>
      <ViewTotalsHorizontal>
        <ViewTotalVertical>
          <ViewLineTotal>
            <TextTotals>Subtotal:</TextTotals>
            <TextTotals> {getTotal()}</TextTotals>
          </ViewLineTotal>
          <ViewLineTotal>
            <TextTotals>Taxa de entrega:</TextTotals>
            <TextTotals> {formatMoney(deliveryPrice)}</TextTotals>
          </ViewLineTotal>
          <ViewLineTotal>
            <TextTotals>Taxa de serviço:</TextTotals>
            <TextTotals> {formatMoney(serviceCharge)}</TextTotals>
          </ViewLineTotal>
          <ViewLineTotal>
            <TextTotals discount={true}>Descontos:</TextTotals>
            <TextTotals discount={true}>
              - {formatMoney(getDiscount())}
            </TextTotals>
          </ViewLineTotal>
          <ViewLineTotal>
            <TextTotals discount={true}>Cupons:</TextTotals>
            <TextTotals discount={true}>
              {coupon?.price ? `- ${formatMoney(coupon?.price)}` : '- R$ 0,00'}
            </TextTotals>
          </ViewLineTotal>
        </ViewTotalVertical>
      </ViewTotalsHorizontal>
    </Container>
  );
};

export default Totals;
