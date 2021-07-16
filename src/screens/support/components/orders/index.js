import React, { useEffect, useState } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';
import LootieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import {
  Container,
  styles,
  StatusBar,
  ViewHeader,
  TextHeader,
  ViewBody,
  ViewOrder,
  CompanyLogo,
  ViewDetails,
  TextCompany,
  TextOrder,
  ViewLoading,
  TextOrdersNotFound,
} from './Styles';

import { isAuthenticated } from '../../../../services/userAuth';
import loaderLootie from '../../../../assets/animations/loader.json';
import { listPayCustomer } from '../../../../services/service/shopping/payment';

const Orders = ({ setOrder, setModal }) => {
  const [orders, setOrders] = useState([]);
  const [ordersNotFound, setOrdersNotFound] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const { user: userAuth } = await isAuthenticated();
      const listResp = await listPayCustomer(userAuth._id);
      if (listResp && listResp.length > 0) {
        setOrders(listResp);
      } else {
        setOrdersNotFound(true);
      }
    };

    getOrders();
  }, []);

  const selectedOrder = order => {
    setOrder(order);
    setModal(false);
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <ViewHeader>
        <Icon
          name="navigate-before"
          size={45}
          style={styles.icon}
          onPress={() => setModal(false)}
        />
        <TextHeader>SELECIONE O PEDIDO</TextHeader>
      </ViewHeader>
      <ViewBody>
        {orders && orders.length > 0 ? (
          orders.map(order => {
            return (
              <ViewOrder onPress={() => selectedOrder(order)}>
                <CompanyLogo
                  source={{
                    uri: order.company.images[0],
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <ViewDetails>
                  <TextCompany numberOfLines={2}>
                    {order.company.name} •{' '}
                    {moment(order.orderStatus.createdAt).format('DD/MM')} •{' '}
                    {moment(order.orderStatus.createdAt).format('HH:mm')}
                  </TextCompany>
                  <TextOrder>
                    Pedido N. {order.orderStatus.order_number}
                  </TextOrder>
                </ViewDetails>
              </ViewOrder>
            );
          })
        ) : (
            <ViewLoading>
              {ordersNotFound ? (
                <TextOrdersNotFound>Nenhum pedido encontrado.</TextOrdersNotFound>
              ) : (
                  <LootieView
                    source={loaderLootie}
                    style={{ height: 120 }}
                    resizeMode="contain"
                    loop
                    autoPlay
                  />
                )}
            </ViewLoading>
          )}
      </ViewBody>
    </Container>
  );
};

export default Orders;
