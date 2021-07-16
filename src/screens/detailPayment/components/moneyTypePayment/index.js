import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatMoney } from '../../../../utils';
import { ViewIcon, ViewBody, TextName, styles } from './Styles';

const MoneyTypePayment = ({ changeMoney, paymentType }) => {
  if (!paymentType || (paymentType && paymentType !== 'MONEY')) {
    return null;
  }

  return (
    <>
      <ViewIcon>
        <Icon name="attach-money" size={30} style={styles.iconCard} />
      </ViewIcon>
      <ViewBody>
        <TextName>Pagamento em dinheiro</TextName>
        <TextName>Troco para {formatMoney(changeMoney)}</TextName>
      </ViewBody>
    </>
  );
};

export default MoneyTypePayment;
