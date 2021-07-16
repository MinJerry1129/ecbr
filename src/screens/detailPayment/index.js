import React, {useState, useCallback} from 'react';
import {Modal} from 'react-native';

import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import * as RNFingerprintCybersource from 'react-native-fingerprint-cybersource';

import {Container, ScrollView} from './Styles';

import Tip from './components/tip';
import Total from './components/total';
import Header from './components/header';
import Totals from './components/totals';
import Address from './components/address';
import Scheduling from './components/scheduling';
import TypePayment from './components/typePayment';
import ModalDetail from './components/modalDetail';
import StatusPaymentDetail from './components/statusPaymentDetail';

import config from '../../config';
import {getToCart} from '../../store/actions/cart';
import {createLog} from '../../services/service/Log';
import {StorageGet} from '../../services/deviceStorage';
import {isAuthenticated} from '../../services/userAuth';
import {listCart} from '../../services/service/shopping/cart';
import {updateCart} from '../../services/service/shopping/cart';
import {seacrhDeliveryAddress} from '../../services/service/delivery/address';

const DetailPayment = ({
  navigation,
  onGetToCart,
  total,
  route,
  cartUser,
  serviceCharge,
  deliveryFee,
}) => {
  const [cart, setCart] = useState(null);
  const [status, setStatus] = useState(1);
  const [attemps, setAttemps] = useState(0);
  const [params, setParams] = useState(true);
  const [company, setCompany] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [tipSelected, setTipSelected] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [fingerPrintId, setFingerPrintId] = useState(null);
  const [modalValidate, setModalValidate] = useState(true);
  const [totalCart, setTotalCart] = useState(0);

  const typeCard = route?.params?.typeCard || '';
  const coupon = route?.params?.coupon?._id || null;
  const couponDiscount = route?.params?.coupon || null;
  const typePayment = route?.params?.typePayment || 'FINANCE';
  const typeSchedule = route?.params?.typeSchedule || 'DELIVERY';

  const changeMoney = route?.params?.changeMoney || 0;
  const card = route?.params?.card || null;

  const getDeliveryList = async userAuth => {
    const resultList = await seacrhDeliveryAddress({
      customer: userAuth._id,
      main: true,
    });

    if (resultList && resultList[0]) {
      setDelivery(resultList[0]);
    }

    setModalValidate(false);
  };

  const getCart = async (companyParam, userAuth) => {
    const cartResult = await listCart(userAuth._id, companyParam._id);
    if (cartResult && cartResult.length) {
      setCart(cartResult[0]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadInfo = async () => {
        let companyParam = await StorageGet('company');
        setCompany(companyParam);
        const {user: userAuth} = await isAuthenticated();

        await getCart(companyParam, userAuth);
        await getDeliveryList(userAuth);

        onGetToCart(companyParam);

        if (!typeSchedule || typeSchedule === 'DELIVERY') {
          setTotalCart(total + deliveryFee);
        } else {
          setTotalCart(total);
        }
      };

      setAttemps(0);
      let pageRedirect = route.params?.pageRedirect ?? null;
      setParams(pageRedirect);
      loadInfo();

      return function cleanup() {
        setModalValidate(false);
        setModalStatus(false);
      };
    }, [
      deliveryFee,
      onGetToCart,
      route.params.pageRedirect,
      total,
      typeSchedule,
    ]),
  );

  useFocusEffect(
    useCallback(() => {
      // CyberSource
      const generateTokenCyberSource = async () => {
        try {
          await RNFingerprintCybersource.configure(config.keyCyberSorce);
        } catch (err) {
          createLog({
            typeSystem: 'MOBILE',
            typeLog: 'ERROR',
            description: {
              message: 'Error no Configure FingerPrint',
              err,
              cart: cart,
            },
            category: 'FingerPrint-error-configure',
            originError: 'detailPayment-generateTokenCyberSource',
          });
        }

        RNFingerprintCybersource.getSessionID([
          config.atributeCyberSorce,
          `${Math.random()}`,
          cart._id,
        ])
          .then(obj => {
            if (!obj || !obj.sessionId) {
              createLog({
                typeSystem: 'MOBILE',
                typeLog: 'ERROR',
                description: {
                  message: 'FingerPrint null',
                  cart,
                },
                category: 'FingerPrint',
                originError: 'detailPayment-generateTokenCyberSource',
              });

              setTimeout(() => {
                setAttemps(attemps + 1);
              }, 2000);
            } else {
              setFingerPrintId(obj.sessionId);
              updateCart(cart._id, {
                fingerPrintId: obj.sessionId,
              });

              // createLog({
              //   typeSystem: 'MOBILE',
              //   typeLog: 'ALERT',
              //   description: {
              //     fingerPrint: obj.sessionId,
              //     message: 'FingerPrint Gerado com Sucesso',
              //     cart: cart,
              //   },
              //   category: 'FingerPrint-Success',
              //   originError: 'detailPayment-generateTokenCyberSource',
              // });
            }
          })
          .catch(err => {
            createLog({
              typeSystem: 'MOBILE',
              typeLog: 'ERROR',
              description: {
                cart,
                message: 'Não foi possível gerar FingerPrint',
                err,
              },
              category: 'FingerPrint',
              originError: 'detailPayment-generateTokenCyberSource',
            });

            setTimeout(() => {
              setAttemps(attemps + 1);
            }, 1000);
          });
      };

      if (cart && cart._id && fingerPrintId == null && attemps < 5) {
        generateTokenCyberSource();
      }
    }, [cart, fingerPrintId, attemps]),
  );

  return (
    <Container>
      <Header
        navigation={navigation}
        params={params}
        company={company}
        coupon={coupon}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalValidate}
          onRequestClose={() => setModalValidate(false)}>
          <ModalDetail />
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalStatus}
          onRequestClose={() => setModalStatus(false)}>
          <StatusPaymentDetail
            status={status}
            statusMessage={statusMessage}
            navigation={navigation}
            setModalStatus={setModalStatus}
            typePayment={typePayment}
          />
        </Modal>
        <Address delivery={delivery} navigation={navigation} />
        <Scheduling
          navigation={navigation}
          company={company}
          schedule={cart?.schedule}
          typeSchedule={typeSchedule}
        />
        <TypePayment
          card={card}
          typeCard={typeCard}
          paymentType={typePayment}
          changeMoney={changeMoney}
          navigation={navigation}
          company={company}
          total={totalCart + tipSelected}
        />
        <Tip
          tipSelected={tipSelected}
          setTipSelected={setTipSelected}
          navigation={navigation}
          tipValue={route?.params.tipValue}
        />
        <Totals
          cart={cartUser}
          coupon={couponDiscount}
          serviceCharge={serviceCharge}
          deliveryFee={deliveryFee}
          tip={tipSelected}
          typeSchedule={typeSchedule}
        />
      </ScrollView>
      <Total
        typeSchedule={typeSchedule}
        total={totalCart + tipSelected}
        coupon={couponDiscount}
        deliveryFee={deliveryFee}
        setStatus={setStatus}
        setStatusMessage={setStatusMessage}
        setModalStatus={setModalStatus}
        cart={cart}
        typePayment={typePayment}
        tipSelected={tipSelected}
        fingerPrintId={fingerPrintId}
        card={card}
        changeMoney={changeMoney}
        navigation={navigation}
        address={delivery?.address}
      />
    </Container>
  );
};

const mapStateToProps = ({cart}) => {
  let total = cart.subTotal + cart.serviceCharge;
  let cartResult = cart.cart ? cart.cart : [];

  // Sum amount itens cart
  let sumItens;
  if (cartResult.length) {
    sumItens = cartResult
      .map(item => item.amount)
      .reduce((prev, next) => prev + next);
  }

  return {
    total: total,
    cartUser: cart.cart,
    serviceCharge: cart.serviceCharge,
    deliveryFee: cart.deliveryFee,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetToCart: company =>
      dispatch(
        getToCart(company._id, {
          delivery: 'true',
          type: company.type,
        }),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailPayment);
