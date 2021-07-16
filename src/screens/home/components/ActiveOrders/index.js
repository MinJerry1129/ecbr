/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

import {isAuthenticated} from '../../../../services/userAuth';
import {listPayCustomerActive} from '../../../../services/service/shopping/payment';
import {currentOrder} from '../../../../services/service/shopping/order';
import {Colors} from '../../../../styles';

const ActiveOrders = ({}) => {
  const navigation = useNavigation();
  const [payments, setPayments] = useState([]);
  const [load, setLoad] = useState(false);
  const iconImage = require('../../../../components/shared/CustomIcon/images/market.png');
  const iconMessage = require('../../../../assets/images/icon_notification.png');

  useEffect(() => {
    listPayment();
  }, []);

  const listPayment = async () => {
    if (payments && payments.length > 0) {
      return;
    }

    const {user: userAuth} = await isAuthenticated();
    const listResp = await listPayCustomerActive(userAuth._id);
    // console.log('listResp', listResp);

    if (listResp && listResp.length > 0) {
      setPayments(listResp);
    }
  };

  const onOrderDetail = async () => {
    let total = payments.length;
    if (total > 1) {
      navigation.navigate('Shopping', {
        screen: 'MyOrder',
      });
    } else if (total === 1) {
      navigation.navigate('Shopping', {
        screen: 'PaymentStatus',
        params: {
          paymentId: payments[0].payment._id,
          orderId: payments[0]._id,
        },
      });
    }
  };

  const goChat = async () => {
    setLoad(true);
    let response = await currentOrder(payments[0]._id);
    setLoad(false);

    if (
      !response ||
      !response.status ||
      (response.status === 'WAIT_COMPANY' ||
        response.status === 'FINISHED' ||
        response.status === 'CANCELED')
    ) {
      return navigation.navigate('Shopping', {
        screen: 'MyOrder',
      });
    }

    navigation.navigate('Support', {
      screen: 'ChatPayment',
      params: {
        payment: payments[0].payment._id,
        orderId: payments[0]._id,
        order: payments[0].order_number,
      },
    });
  };

  return payments && payments.length > 0 ? (
    <View style={styles.container}>
      {!load || load === false ? (
        <>
          <TouchableOpacity
            style={styles.iconCartContainer}
            onPress={() => onOrderDetail()}>
            <Image source={iconImage} style={styles.icon} />
          </TouchableOpacity>

          <View style={styles.content}>
            <TouchableOpacity
              style={styles.contentTxtActive}
              onPress={() => onOrderDetail()}>
              <Text style={styles.txtActive}>
                {payments.length > 1
                  ? payments.length + ' Pedidos Ativos'
                  : payments.length + ' Pedido Ativo'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderContainer}
              onPress={() => goChat()}>
              {/* <Text style={styles.txtOrder}>{payments.length}</Text> */}
              {/* <Icon name="message" size={25} style={styles.messageIcon} /> */}
              <Image source={iconMessage} style={styles.iconMessage} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.contentLoader}>
          <ActivityIndicator size="small" color={Colors.PRIMARY} />
        </View>
      )}
    </View>
  ) : null;
};

export default React.memo(ActiveOrders);
