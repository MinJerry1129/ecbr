import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

import distanteFormat from '../../../../services/maps/distanceCoordinate';
import { listCompanyAccessories } from '../../../../services/service/company';
import { listFilter } from '../../../../services/service/Filter';
import { searchCupounsCompany } from '../../../../services/service/coupon';
import { StorageGet } from '../../../../services/deviceStorage';

import { round } from '../../../../utils';
import { formatMoney } from '../../../../utils';

import styles from './styles';

import LootieView from 'lottie-react-native';
import loaderLootie from '../../../../assets/animations/loader.json';

const Companys = refreshing => {
  const navigation = useNavigation();
  const route = useRoute();

  const [notResult, setNotResult] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [guestAddress, setGuestAddres] = useState(null);
  const [customerAddress, setCustomerAddres] = useState(null);
  const [dataFilter, setDataFilter] = useState([]);
  const [topFilter, setTopFilter] = useState(null);
  const [category, setCategory] = useState(route.params?.category ?? null);

  const coupon = route.params?.coupon ?? null;

  const goProducts = item => {
    navigation.replace('AccessoriesProduct', {
      company: item,
    });
  };

  const txtDistante = item => {
    let companyCoord = null;
    let userCoord = null;

    if (item.location && item.location.coordinates) {
      companyCoord = item.location.coordinates;
    }

    if (guestAddress && guestAddress.location) {
      userCoord = guestAddress.location.coordinates;
    } else if (
      customerAddress.location &&
      customerAddress.location.coordinates
    ) {
      userCoord = customerAddress.location.coordinates;
    }
    return companyCoord && userCoord ? (
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
    ) : null;
  };

  const deliveryTime = item => {
    try {
      if (item && item.deliveryTime) {
        return ` Aprox. ${item.deliveryTime} Min - `;
      }

      return '';
    } catch (err) {
      return '';
    }
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

  const address = useCallback(async () => {
    let respAddress = await StorageGet('@addressUser');
    if (
      !respAddress ||
      !respAddress.location ||
      !respAddress.location.coordinates
    ) {
      return navigation.navigate('Customer', {
        screen: 'CustomerAddress',
        params: {},
      });
    }

    setCustomerAddres(respAddress);
    return respAddress;
  }, [navigation]);

  const companyRequest = useCallback(
    async addressUser => {
      let result;
      const location = addressUser.location.coordinates;

      if (coupon) {
        if (category) {
          result = await listCompanyAccessories({
            couponCompaniesId: coupon.companyCoupon,
            category,
            delivery: true,
            latitude: location[1],
            longitude: location[0],
            limit: 7,
            page: 1,
            showAll: true,
          });
        } else {
          result = await listCompanyAccessories({
            couponCompaniesId: coupon.companyCoupon,
            delivery: true,
            latitude: location[1],
            longitude: location[0],
            limit: 7,
            page: 1,
            showAll: true,
          });
        }
      } else {
        if (category) {
          result = await listCompanyAccessories({
            delivery: true,
            category,
            latitude: location[1],
            longitude: location[0],
            limit: 7,
            page: 1,
            showAll: true,
          });
        } else {
          result = await listCompanyAccessories({
            delivery: true,
            latitude: location[1],
            longitude: location[0],
            limit: 7,
            page: 1,
            showAll: true,
          });
        }
      }

      if (result.list && result.list.length > 0) {
        const getCouponCompany = await searchCupounsCompany();
        await result.list.map(async (company, index) => {
          const responseCoupon = await getCouponCompany.find(
            getCoupon => getCoupon.company[0]._id === company._id,
          );
          if (responseCoupon) {
            result.list[index].cupom = responseCoupon.coupon;
          }
        });
        setCompanies(result.list);
        setNotResult(false);
      } else {
        setCompanies([]);
        setNotResult(true);
      }
    },
    [category, coupon],
  );

  const getFilterCompany = async () => {
    let filter = await listFilter({
      type: 'accessories',
    });

    if (filter) {
      setDataFilter(filter);
    }
  };

  const loadScreen = useCallback(async () => {
    const addressUser = await address();

    if (addressUser !== false) {
      companyRequest(addressUser);
    }
  }, [address, companyRequest]);

  useEffect(() => {
    getFilterCompany();
    loadScreen();
  }, [loadScreen, refreshing]);

  return (
    <>
      {!notResult ? (
        companies && companies.length > 0 ? (
          <View style={styles.Container}>
            {companies.map(item => (
              <TouchableOpacity
                key={item._id}
                onPress={() => goProducts(item)}
                style={styles.listView}>
                <View style={styles.BoxlistView}>
                  <View style={styles.image}>
                    <FastImage
                      source={{
                        uri: item.images[0],
                        priority: FastImage.priority.normal,
                      }}
                      style={[
                        styles.image,
                        item.companyDelivery?.isOpen === false
                          ? styles.imageClosed
                          : null,
                      ]}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    {item.companyDelivery?.isOpen === false ? (
                      <Text style={styles.textClosed}>Fechado</Text>
                    ) : null}
                  </View>
                  <View style={styles.listCard}>
                    <Text style={styles.txtTitle} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={[styles.star]}>
                      <Icon name="star" />{' '}
                      {item.companyDelivery?.totalRating > 20
                        ? round(item.companyDelivery.mediaRating, 1)
                        : 'Novo'}{' '}
                      {txtDistante(item)}
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
                </View>
                {item.cupom ? (
                  <View style={styles.BoxFooter}>
                    <Text style={styles.TextCupom}>
                      Cupom de R$ {item.cupom} disponível
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
            <View style={styles.ContainerLoading}>
              <LootieView
                source={loaderLootie}
                style={{ height: 120 }}
                resizeMode="contain"
                loop
                autoPlay
              />
            </View>
          )
      ) : (
          <View style={styles.Container}>
            <Text style={styles.txtNotFound}>
              Ops nenhum resultado encontrado!!
          </Text>
          </View>
        )}
    </>
  );
};

export default Companys;
