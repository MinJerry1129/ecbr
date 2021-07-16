/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import distanteFormat from '../../services/maps/distanceCoordinate';
// import Load from '../../components/shared/load';
import { listCompany } from '../../services/service/company';
import { CustomHeader, HeaderTitle, styles } from './styles';

import { seacrhDeliveryAddress } from '../../services/service/delivery/address';
import { isAuthenticated } from '../../services/userAuth';
import { formatMoney } from '../../utils';
import { round } from '../../utils';

const CompaniesCoupon = ({ navigation, route }) => {
  const [modalLoad, setModalLoad] = useState(false);
  const [notResult, setNotResult] = useState(false);
  const [company, setCompany] = useState([]);
  const [customerAddress, setCustomerAddres] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadScreen();
    }, []),
  );

  const loadScreen = async () => {
    const coupon = route.params?.coupon ?? null;

    if (coupon) {
      const addressUser = await address();
      if (addressUser !== false) {
        companyRequest(addressUser, coupon?._id);
      }
    } else {
      setCompany([]);
      setNotResult(true);
    }
  };

  const address = async () => {
    const { user: userAuth } = await isAuthenticated();

    const addressMain = await seacrhDeliveryAddress({
      customer: userAuth._id,
      main: true,
    });

    if (!addressMain || addressMain.length <= 0) {
      navigation.navigate('Customer', {
        screen: 'CustomerAddress',
      });
      return false;
    }

    setCustomerAddres(addressMain[0]);
    return addressMain[0];
  };

  const companyRequest = async (addressUser, couponId) => {
    setModalLoad(true);
    const location = addressUser.location.coordinates;
    var result = await listCompany({
      delivery: true,
      latitude: location[1],
      longitude: location[0],
      couponId: couponId,
    });

    setModalLoad(false);
    if (result !== null && result.length > 0) {
      result.sort((a, b) =>
        a.companyDelivery?.isOpen > b.companyDelivery?.isOpen ? -1 : 1,
      );
      setCompany(result);
      setNotResult(false);
    } else {
      setCompany([]);
      setNotResult(true);
    }
  };

  const tougleModal = () => {
    if (modalLoad) {
      setModalLoad(false);
    } else {
      setModalLoad(true);
    }
  };

  const txtDistante = item => {
    let companyCoord = null;
    let userCoord = null;

    if (item.location && item.location.coordinates) {
      companyCoord = item.location.coordinates;
    }

    if (customerAddress.location && customerAddress.location.coordinates) {
      userCoord = customerAddress.location.coordinates;
    }
    return (
      <>
        {companyCoord && userCoord ? (
          <Text style={styles.txtDistance}>
            {distanteFormat(
              {
                latitude: userCoord[1],
                longitude: userCoord[0],
              },
              {
                latitude: companyCoord[1],
                longitude: companyCoord[0],
              },
            )}
          </Text>
        ) : null}
      </>
    );
  };

  const deliveryPrice = price => {
    try {
      if (price > 0) {
        return `${formatMoney(price)}`;
      }
      return 'Grátis';
    } catch (err) {
      return '';
    }
  };

  const deliveryTime = item => {
    try {
      if (item && item.deliveryTime) {
        return `Aprox. ${item.deliveryTime} Min - `;
      }

      return '';
    } catch (err) {
      return '';
    }
  };

  const goProducts = item => {
    if (item.type === 'restaurant') {
      navigation.navigate('Restaurant', {
        screen: 'RestaurantProduct',
        params: {
          company: item,
        },
      });
    } else {
      navigation.navigate('Supermarket', {
        screen: 'Product',
        params: {
          company: item,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader>
        <Icon
          name="chevron-left"
          size={38}
          color="#fff"
          style={{ position: 'absolute', left: 0, paddingTop: 15 }}
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>Estabelecimentos</HeaderTitle>
      </CustomHeader>
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalLoad}
        onRequestClose={() => tougleModal()}>
        <Load title="Carregando Informações" subTitle="Um momento..." />
      </Modal> */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          {!notResult ? (
            company && company.length > 0 ? (
              company.map(item => (
                <View style={styles.flatList} key={item._id}>
                  <TouchableOpacity
                    style={styles.listView}
                    onPress={() => goProducts(item)}>
                    <View>
                      <Image
                        style={
                          item.companyDelivery?.isOpen === false
                            ? styles.imageClosed
                            : styles.image
                        }
                        source={{ uri: item.images[0] }}
                        resizeMode="center"
                      />
                      {item.companyDelivery?.isOpen === false ? (
                        <Text style={styles.textImage}>Fechado</Text>
                      ) : null}
                    </View>
                    <View style={styles.listCard}>
                      <Text style={styles.txtTitle}>{item.name}</Text>
                      <Text style={[styles.star]}>
                        <Icon name="star" /> Novo {' - '}
                        <Text style={[styles.star]}>
                          <Icon name="star" />
                          {item.companyDelivery?.totalRating > 20
                            ? round(item.companyDelivery.mediaRating, 1)
                            : 'Novo'}
                          {customerAddress !== null && txtDistante(item)}
                        </Text>
                      </Text>
                      {item.deliveryPrice >= 0 ? (
                        <Text
                          style={[
                            styles.txtInfo,
                            item.deliveryPrice === 0 ? styles.infoGreen : null,
                          ]}>
                          <Icon name="motorcycle" />
                          {deliveryTime(item)}
                          {`${deliveryPrice(item.deliveryPrice)}`}
                        </Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
                <View style={styles.flatList}>
                  <Text style={styles.txtNotFound}>Carregando...</Text>
                </View>
              )
          ) : (
              <View style={styles.flatList}>
                <Text style={styles.txtNotFound}>
                  Ops nenhum resultado encontrado!!
              </Text>
              </View>
            )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CompaniesCoupon;
