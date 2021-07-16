import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';

import { Container, TextHour, TextDeliveryPrice } from './Styles';

import { formatMoney } from '../../../../../utils';
import { StorageGet } from '../../../../../services/deviceStorage';
import { updateCart } from '../../../../../services/service/shopping/cart';

const hoursDay = ({
  item,
  navigation,
  coupon,
  typeSchedule,
  deliveryPrice,
  date,
  company,
}) => {
  const selectedDay = async () => {
    const cart = await StorageGet('cart-atual');
    const cartId = cart && cart._id ? cart._id : undefined;

    // Get cart ID
    if (cartId) {
      const datetime = moment(`${date} ${item.start}`, 'YYYY-MM-DD Hmm').format(
        'YYYY-MM-DD HH:mm',
      );

      const payload = {
        schedule: {
          companyScheduleId: item.id,
          startHour: item.start,
          endHour: item.end,
          deliveryDate: datetime,
        },
      };

      const saveScheduleCart = await updateCart(cartId, payload);

      if (saveScheduleCart) {
        let type;
        let screen;

        if (company.type === 'supermarket') {
          type = 'Supermarket';
          screen = 'Product';
        } else {
          type = 'Restaurant';
          screen = 'RestaurantProduct';
        }

        navigation.navigate('DetailPayment', {
          pageRedirect: [type, screen],
          company,
          payload,
          coupon,
          typeSchedule,
        });
        return;
      }
    }
  };

  return (
    <Container onPress={() => selectedDay()}>
      <TextHour>
        {`${moment(item.start, 'Hmm').format('HH:mm')} - ${moment(
          item.end,
          'Hmm',
        ).format('HH:mm')}`}
      </TextHour>
      <TextDeliveryPrice isFree={typeSchedule !== 'DELIVERY'}>
        {typeSchedule === 'DELIVERY'
          ? `Frete: ${formatMoney(deliveryPrice)}`
          : 'Grátis'}
      </TextDeliveryPrice>
    </Container>
  );
};

export default hoursDay;
