import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  ViewIcon,
  ViewBody,
  TxtCard,
  styles,
  ViewLoading,
  TextLoading,
} from './Styles';

import { isAuthenticated } from '../../../../services/userAuth';
import { listPaymentMethod } from '../../../../services/service/shopping/paymentMethod';

const FinanceTypePayment = ({ paymentType, navigation }) => {
  if (!paymentType || (paymentType && paymentType !== 'FINANCE')) {
    return null;
  }

  const [loader, setLoader] = useState(false);
  const [methodPayment, setMethodPayment] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const paymentMethods = async () => {
        setLoader(true);
        const { user: userAuth } = await isAuthenticated();
        const list = await listPaymentMethod(userAuth._id);

        if (list == null || list.length <= 0) {
          navigation.navigate('PaymentMethods', {
            redirectPayment: true,
            newRegister: true,
          });
          return;
        }

        setLoader(false);
        setMethodPayment(list.filter(c => c.isMain === true)[0]);
      };

      paymentMethods();

      return function cleanup() {
        paymentMethods();
      };
    }, [navigation, setMethodPayment]),
  );

  return (
    <>
      {loader ? (
        <ViewLoading>
          <TextLoading>Carregando...</TextLoading>
        </ViewLoading>
      ) : (
          <>
            <ViewIcon>
              <Icon name="credit-card" size={30} style={styles.iconCard} />
            </ViewIcon>
            <ViewBody>
              <TxtCard>
                ****{' '}
                {methodPayment?.cartNumber?.substring(
                  12,
                  methodPayment?.cartNumber?.length,
                )}{' '}
              • Crédito
            </TxtCard>
            </ViewBody>
          </>
        )}
    </>
  );
};

export default FinanceTypePayment;
