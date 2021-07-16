import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import Toast from 'react-native-tiny-toast';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  IconGoBack,
  styles,
  HeaderText,
  Body,
} from './Styles';
import { Colors } from '../../styles';

import PaymentType from './components/paymentType';
import PaymentMoney from './components/paymentMoney';
import AddMethodPayment from './components/addCreditCard';
import LocalCreditCard from './components/localCreditCard';
import RegisteredCards from './components/registeredCards';

import { listTypePaymentsCompanyDelivery } from '../../services/service/finance';

const PaymentMethods = ({ navigation, route }) => {
  const [loadAdd, setLoadMethod] = useState(false);
  const [newRegister, setNewRegister] = useState(false);
  const [typePayments, setTypePayments] = useState(null);
  const [redirectPayment, setRedirectPayment] = useState(false);
  const [modalPaymentMoney, setModalPaymentMoney] = useState(false);
  const [modalLocalCreditCard, setModalLocalCreditCard] = useState(false);
  const [total, setTotal] = useState(() => {
    return route.params?.total;
  });

  const redirect = route.params?.redirectPayment ?? false;
  const newRegisterParam = route.params?.newRegister ?? false;
  const companyId = route.params?.company?.companyDelivery?._id ?? null;

  const goBack = () => {
    if (redirectPayment) {
      navigation.navigate('Shopping', {
        screen: 'DetailPayment',
        params: {
          typePayment: 'FINANCE',
        },
      });

      return;
    }

    if (navigation.goBack() === false) {
      navigation.navigate('Home', { screen: 'Home' });
    }
  };

  const closeAddPayment = () => {
    setLoadMethod(false);
    if (redirectPayment) {
      navigation.navigate('Shopping', {
        screen: 'DetailPayment',
      });

      return;
    }
  };

  const toastShow = msg => {
    Toast.show(msg, {
      position: Toast.position.TOP,
      containerStyle: {
        marginHorizontal: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
      },
      textStyle: { color: Colors.WHITE },
      mask: false,
      maskStyle: {},
      duration: 8000,
      animation: true,
    });
  };

  useEffect(() => {
    if (redirect) {
      setRedirectPayment(redirect);
    }

    if (newRegisterParam) {
      setNewRegister(newRegisterParam);
    }

    return function cleanup() { };
  }, [newRegisterParam, redirect]);

  useEffect(() => {
    if (!companyId) {
      return;
    }

    const getTypesPayment = async () => {
      const resutlTypePayments = await listTypePaymentsCompanyDelivery(
        companyId,
      );

      if (resutlTypePayments) {
        setTypePayments(resutlTypePayments);
      }
    };

    getTypesPayment();
  }, [companyId]);

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={loadAdd}
        onRequestClose={() => setLoadMethod(false)}>
        <AddMethodPayment close={closeAddPayment} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalPaymentMoney}
        onRequestClose={() => setModalPaymentMoney(false)}>
        <PaymentMoney
          close={setModalPaymentMoney}
          navigation={navigation}
          total={total}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalLocalCreditCard}
        onRequestClose={() => setModalLocalCreditCard(false)}>
        <LocalCreditCard
          close={setModalLocalCreditCard}
          typePayment={typePayments?.CARD}
          navigation={navigation}
        />
      </Modal>
      <Header>
        <IconGoBack onPress={() => goBack()}>
          <Icon name="navigate-before" size={45} style={styles.icon} />
        </IconGoBack>
        <HeaderText>FORMA DE PAGAMENTO</HeaderText>
      </Header>
      <Body showsVerticalScrollIndicator={false}>
        {newRegister &&
          toastShow(
            'Para continuar sua compra cadastre um método de pagamento',
          )}
        <PaymentType
          typePayments={typePayments}
          setLoadMethod={setLoadMethod}
          setModalPaymentMoney={setModalPaymentMoney}
          setModalLocalCreditCard={setModalLocalCreditCard}
        />
        <RegisteredCards loadAdd={loadAdd} goBack={goBack} />
      </Body>
    </Container>
  );
};

export default PaymentMethods;
