/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import distanteFormat from '../../services/maps/distanceCoordinate';
import Load from '../../components/shared/load';
import { listCompanyFavorites } from '../../services/service/company';

import { CustomHeader, HeaderTitle, styles } from './styles';

import { seacrhDeliveryAddress } from '../../services/service/delivery/address';
import { isAuthenticated } from '../../services/userAuth';
import { formatMoney } from '../../utils';
import { getAuthenticated } from '../../services/userAuth';
import { listCustomerSearch } from '../../services/service/customer';

const Favorite = ({ navigation, route }) => {
  const [modalLoad, setModalLoad] = useState(false);
  const [notResult, setNotResult] = useState(false);
  const [company, setCompany] = useState([]);
  const [customerAddress, setCustomerAddres] = useState(null);

  const loadScreen = async () => {
    const addressUser = await address();
    if (addressUser !== false) {
      companyRequest(addressUser);
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

  const companyRequest = async addressUser => {
    setModalLoad(true);

    let localCompanies = [];

    const resultUser = await getAuthenticated();

    if (resultUser === false) {
      navigation.navigate('Login', {
        screen: 'login',
      });
      return;
    }

    const customer = await listCustomerSearch({
      email: resultUser.user.email,
    });

    if (customer && customer.favoriteRestaurants) {
      localCompanies = [...localCompanies, ...customer.favoriteRestaurants];
    }

    if (customer && customer.favoriteSupermarkets) {
      localCompanies = [...localCompanies, ...customer.favoriteSupermarkets];
    }

    if (!localCompanies || localCompanies.length === 0) {
      setCompany([]);
      setNotResult(true);
      setModalLoad(false);
      return;
    }

    var result = await listCompanyFavorites({
      favoriteCompanies: localCompanies,
    });

    setModalLoad(false);
    if (result.list !== null && result.list.length > 0) {
      setCompany(result.list);
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

  useEffect(() => {
    loadScreen();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader>
        <Icon
          name="chevron-left"
          size={38}
          color="#fff"
          style={{ position: 'absolute', left: 0, paddingTop: 15 }}
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>Favoritos</HeaderTitle>
      </CustomHeader>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalLoad}
        onRequestClose={() => tougleModal()}>
        <Load title="Carregando Informações" subTitle="Um momento..." />
      </Modal>
      <ScrollView style={styles.scrollView}>
        {!notResult ? (
          company && company.length > 0 ? (
            company.map(item => (
              <View style={styles.flatList} key={item._id}>
                <TouchableOpacity
                  style={styles.listView}
                  onPress={() => goProducts(item)}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.images[0] }}
                    resizeMode="center"
                  />
                  <View style={styles.listCard}>
                    <Text style={styles.txtTitle} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={[styles.star]}>
                      <Icon name="star" /> Novo {' - '}
                      {customerAddress !== null && txtDistante(item)}
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
  );
};

export default Favorite;
