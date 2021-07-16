import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, Image} from 'react-native';

import {isAuthenticated} from '../../../../../../services/userAuth';
import {listPayCustomerActive} from '../../../../../../services/service/shopping/payment';
import {listCartItem} from '../../../../../../services/service/shopping/cartItem';

import styles from '../../styles';
import stylesBuyAgain from './styles';

const BuyAgain = ({hr}) => {
  const [orders, setOrders] = useState([]);

  const bike = require('../../images/bike.png');
  const hrActive = hr !== false ? true : false;

  const listPayment = useCallback(async () => {
    const {user} = await isAuthenticated();
    const listResp = await listPayCustomerActive(user._id, {
      cartSuccess: true,
    });

    if (listResp && listResp.length > 0) {
      getShoppingCartAndShowProducts(listResp);
    }
  }, [getShoppingCartAndShowProducts]);

  const getShoppingCartAndShowProducts = useCallback(async getOrders => {
    let newOrders = [];

    for (let i = 0; i < getOrders.length; i++) {
      const data = await listCartItem(getOrders[i].shoppingCart);
      getOrders[i].foodProduct = [];

      data.map(product => {
        if (product.foodProduct) {
          getOrders[i].foodProduct = [
            product.foodProduct,
            ...getOrders[i].foodProduct,
          ];
        } else {
          getOrders[i].foodProduct = [
            product.product,
            ...getOrders[i].foodProduct,
          ];
        }
      });
      newOrders.push(getOrders[i]);
    }
    setOrders(newOrders);
  }, []);

  useEffect(() => {
    listPayment();
  }, [listPayment]);

  return orders ? (
    <View>
      <Text style={styles.Title}>Pedir novamente</Text>
      <FlatList
        data={orders}
        horizontal={true}
        initialNumToRender={2}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={stylesBuyAgain.BoxBuyAgain}>
            <View style={stylesBuyAgain.BoxCompany}>
              <Image
                source={{uri: item.company.images[0]}}
                style={styles.Brand}
              />
              <View>
                <Text style={styles.CompanyName}>{item.company.name}</Text>
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
            {item.foodProduct && Object.keys(item.foodProduct).length > 0 ? (
              <View style={styles.BoxCompanyFooter}>
                <Text style={styles.CompanyFooterText} numberOfLines={1}>
                  {item.foodProduct.map((product, index, array) =>
                    index === array.length - 1
                      ? product.name
                      : `${product.name} • `,
                  )}
                </Text>
              </View>
            ) : null}
          </View>
        )}
      />
      {hrActive ? <View style={styles.hr} /> : null}
    </View>
  ) : null;
};

export default BuyAgain;
