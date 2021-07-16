import React, {useState} from 'react';

import publicIp from 'public-ip';

import {
  Container,
  ViewTotal,
  Text,
  TouchSendOrder,
  ViewButton,
  TextButton,
  ActivityIndicator,
} from './Styles';

import {formatMoney} from '../../../../utils';
import {
  sendPayment,
  sendPaymentCard,
  sendPaymentMoney,
  errSendPayment,
  errPayload,
} from '../../../../services/service/shopping/payment';
import {isAuthenticated} from '../../../../services/userAuth';

const Total = ({
  total,
  coupon,
  setStatus,
  setStatusMessage,
  setModalStatus,
  cart,
  typePayment,
  tipSelected,
  fingerPrintId,
  card,
  changeMoney,
  navigation,
  address,
  typeSchedule,
}) => {
  const [loader, setLoader] = useState(false);
  const [disabledFinishedButton, setDisabledFinishedButton] = useState(false);

  const finalPrice = () => {
    try {
      let finalTotal = total;

      if (coupon && coupon.price && coupon.price > 0) {
        finalTotal -= coupon.price;
      }

      return formatMoney(finalTotal);
    } catch (err) {
      console.log(err);
      return formatMoney(total);
    }
  };

  const payOrder = async () => {
    setStatus(1);
    setStatusMessage('Estamos criando seu pedido...');
    setModalStatus(true);
    setDisabledFinishedButton(true);

    const {user} = await isAuthenticated();

    const ip = await publicIp.v4({
      fallbackUrls: ['https://ifconfig.co/ip'],
    });

    if (cart) {
      let respPayment;

      if (typePayment && typePayment === 'CARD') {
        respPayment = await sendPaymentCard(cart._id, {
          customer: user._id,
          ipAddress: ip,
          coupon,
          valueTip: tipSelected,
          fingerPrintId,
          typePaymentId: card._id,
          typeSchedule,
        });
      } else if (typePayment && typePayment === 'MONEY') {
        respPayment = await sendPaymentMoney(cart._id, {
          customer: user._id,
          ipAddress: ip,
          coupon,
          valueTip: tipSelected,
          fingerPrintId,
          cashChange: changeMoney,
          typeSchedule,
        });
      } else {
        respPayment = await sendPayment(cart._id, {
          customer: user._id,
          ipAddress: ip,
          coupon,
          valueTip: tipSelected,
          fingerPrintId,
          typeSchedule,
        });
      }

      if (errSendPayment !== null) {
        if (errPayload && errPayload.status === 'error') {
          setStatus('error');
        } else {
          setStatus(3);
        }

        setStatusMessage(errSendPayment);
        setDisabledFinishedButton(false);
        return;
      }

      if (
        respPayment &&
        respPayment.paymentId &&
        respPayment.status > 0 &&
        respPayment.status <= 2
      ) {
        setStatus(2);
        setStatusMessage('Pedido Criado');
        setTimeout(() => {
          navigation.navigate('Shopping', {
            screen: 'PaymentStatus',
            params: {
              paymentId: respPayment.paymentId,
            },
          });
          setDisabledFinishedButton(false);
          setModalStatus(false);
        }, 1000);

        return;
      }

      setDisabledFinishedButton(false);

      if (respPayment && respPayment.status) {
        setStatus(respPayment.status);
        setStatusMessage(respPayment.statusMessage);
        return;
      }

      setModalStatus(false);
    } else {
      setDisabledFinishedButton(false);
      setModalStatus(false);
    }
  };

  const sendPaymentAndActiveLoader = async () => {
    try {
      setLoader(true);
      await payOrder();
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  };

  const disabled = () => {
    return address && fingerPrintId !== null && !disabledFinishedButton
      ? false
      : true;
  };

  return (
    <Container>
      <ViewTotal>
        <Text>TOTAL:</Text>
        <Text>{finalPrice()}</Text>
      </ViewTotal>
      <ViewButton>
        <TouchSendOrder
          enabled={!loader}
          disabled={loader && !disabled()}
          onPress={() => sendPaymentAndActiveLoader()}>
          {disabled() ? (
            <ActivityIndicator size="small" />
          ) : (
            <TextButton enabled={!loader}>
              {loader ? 'Carregando...' : 'Fazer Pedido'}
            </TextButton>
          )}
        </TouchSendOrder>
      </ViewButton>
    </Container>
  );
};

export default Total;
