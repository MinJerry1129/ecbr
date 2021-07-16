import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {isAuthenticated} from '../../../../../../services/userAuth';
import {seacrhDeliveryAddress} from '../../../../../../services/service/delivery/address';
import {companys} from '../../../../../../services/service/coupon';
import {fixedNumbers} from '../../components/functions';
import {StorageGet} from '../../../../../../services/deviceStorage';

import styles from '../../styles';
import stylesCoupon from './styles';

const Coupon = ({hr}) => {
  const [orders, setOrders] = useState([]);
  const [coordinate, setCoordinate] = useState([]);
  const [page, setPage] = useState(0);
  const [pageLoad, setPageLoad] = useState(1);

  const hrActive = hr !== false ? true : false;
  const navigation = useNavigation();

  const listCoupons = useCallback(async coordinates => {
    const listResp = await companys(coordinates[0], coordinates[1], 1);
    setCoordinate([coordinates[0], coordinates[1]]);

    if (listResp && listResp.data && listResp.data.length > 0) {
      setOrders(listResp.data);
      setPage(listResp.pagination.total_pages);
    }
  }, []);

  const getAddressUser = useCallback(async () => {
    let respAddress = await StorageGet('@addressUser');
    if (!respAddress) {
      return setOrders([]);
    }

    listCoupons(respAddress.location.coordinates);
  }, [listCoupons]);

  const loadNewPageCupons = async getTotalPage => {
    if (getTotalPage > 1 && pageLoad < getTotalPage) {
      const getPageAndLoad = pageLoad + 1;
      const listResp = await companys(
        coordinate[0],
        coordinate[1],
        getPageAndLoad,
      );

      if (listResp && listResp.data && listResp.data.length > 0) {
        setOrders([...orders, ...listResp.data]);
        setPageLoad(getPageAndLoad);
      }
    }
  };

  const goProducts = (item, type) => {
    if (String(type).toLowerCase() === 'restaurant') {
      return navigation.navigate('Restaurant', {
        screen: 'RestaurantProduct',
        params: {
          company: item,
        },
      });
    }

    navigation.navigate('Supermarket', {
      screen: 'Product',
      params: {
        company: item,
      },
    });
  };

  useEffect(() => {
    getAddressUser();
  }, [getAddressUser]);

  return orders && orders.length > 0 ? (
    <View>
      <Text style={styles.Title}>Lugares com cupom</Text>
      <FlatList
        data={orders}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        initialNumToRender={2}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadNewPageCupons(page)}
        keyExtractor={() =>
          Math.random()
            .toString(12)
            .substring(0)
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={stylesCoupon.BoxBuyAgain}
            onPress={() => goProducts(item.company[0], item.company[0].type)}>
            <View style={stylesCoupon.BoxCompany}>
              <FastImage
                source={{
                  uri: item.company[0].images[0],
                  priority: FastImage.priority.normal,
                }}
                style={styles.Brand}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.BoxCompanyInfo}>
                <Text style={styles.CompanyName} numberOfLines={1}>
                  {item.company[0].name}
                </Text>
                <Text style={styles.CompanyName} numberOfLines={1} />
                {/* <View>
                  <Text>• km</Text>
                </View>
                <View style={styles.BoxInfoCompany}>
                  <Image source={bike} style={styles.bike} />
                  <Text style={styles.InfoCompanyText}>Aprox. min •</Text>
                  <Text style={styles.InfoCompanyText}>R$</Text>
                </View> */}
              </View>
            </View>
            <View style={styles.BoxCompanyFooter}>
              <Text style={styles.CompanyFooterText} numberOfLines={1}>
                Cupom de R$ {fixedNumbers(item.coupon, 2)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {hrActive ? <View style={styles.hr} /> : null}
    </View>
  ) : null;
};

export default Coupon;
