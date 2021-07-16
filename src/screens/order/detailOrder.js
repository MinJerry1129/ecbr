/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Typography } from '../../styles';

import { listCartItem } from '../../services/service/shopping/cartItem';

const DetailOrder = ({ close, paymentItem }) => {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    paymentCartItem();
    return () => { };
  }, [paymentItem]);

  const paymentCartItem = async () => {
    let type = 'supermarket';
    if (paymentItem && paymentItem.company && paymentItem.company.type) {
      type = paymentItem.company.type;
    }

    const respCartItem = await listCartItem(paymentItem.shoppingCart, { type });

    if (respCartItem) {
      setCartItem(respCartItem);
    }
  };

  const flatRender = item => {
    try {
      let product = null;
      if (item && item.product) {
        product = item.product;
      }

      if (item && item.foodProduct) {
        product = item.foodProduct;
      }

      return (
        <>
          <View style={styles.list}>
            <View style={styles.imageContainer}>
              {product && product.images && (
                <Image
                  style={styles.imageProduct}
                  source={{ uri: product.images[0] }}
                  resizeMode="contain"
                />
              )}
            </View>
            <Text style={styles.txtNameProd}>
              {`${item.amount} x ${product.name}`}
            </Text>
          </View>
        </>
      );
    } catch (err) {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => close(false)}>
          <Icon name="navigate-before" size={40} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Detalhe Pedido</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          horizontal={false}
          data={cartItem}
          keyExtractor={item => `${item._id}`}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          renderItem={({ item }) => flatRender(item)}
        />

        {paymentItem.deliveryAddress && paymentItem.deliveryAddress.address ? (
          <View style={styles.deliveryAddress}>
            <Text style={styles.txtAddress}>Endereço de Entrega</Text>
            <Text style={styles.txtDeliveryAddress}>
              {paymentItem.deliveryAddress.address}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  backIcon: {
    color: Colors.PRIMARY,
  },
  txtHeader: {
    textAlign: 'center',
    flex: 1,
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
  },
  list: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  imageProduct: {
    width: 80,
    height: 80,
  },
  divider: {
    borderColor: Colors.GREY,
    marginVertical: 10,
    borderWidth: 0.5,
    marginHorizontal: 20,
  },
  txtNameProd: {
    flex: 5,
    marginLeft: 5,
    fontSize: Typography.FONT_SIZE_14,
    color: '#555555',
  },
  txtPrice: {
    flex: 2,
    marginLeft: 2,
    fontSize: Typography.FONT_SIZE_16,
    color: '#555555',
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  deliveryAddress: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  txtAddress: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtDeliveryAddress: {
    color: Colors.PRIMARY_DARK,
    fontSize: Typography.FONT_SIZE_18,
    fontWeight: '300',
  },
});
