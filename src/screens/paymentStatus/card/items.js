/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LootieView from 'lottie-react-native';
import loaderLootie from '../../../assets/animations/loader.json';

/** Service */
import { showAllCart } from '../../../services/service/shopping/cartItem';

/** Util */
import { formatMoney } from '../../../utils';

const PaymentStatusItems = ({ navigation, route }) => {
  const noImage = require('../../../assets/images/product/no_image.png');
  // const items = route.params?.items ?? [];
  // const type = route.params?.type ?? '';
  const shoppingCart = route.params?.shoppingCart ?? null;

  const [load, setLoad] = useState(false);

  const [listProducts, setListProducts] = useState([]);
  const [listRemoved, setListRemoved] = useState(null);
  const [listAdd, setListAdd] = useState(null);

  useEffect(() => {
    if (shoppingCart) {
      getCartItem(shoppingCart);
    }
  }, [shoppingCart]);

  const getCartItem = async cartId => {
    try {
      setLoad(true);
      let response = await showAllCart(cartId);

      if (response && response.itens) {
        setListProducts(response.itens);
      }

      if (response && response.removed && response.removed.length > 0) {
        setListRemoved(response.removed);
      }

      if (response && response.added && response.added.length > 0) {
        setListAdd(response.added);
      }

      setLoad(false);
    } catch (err) {
      setLoad(false);
      return [];
    }
  };

  const showItem = index => {
    let newList = [...listProducts];
    newList[index].editableVisble = !newList[index].editableVisble;
    setListProducts(newList);
  };

  const getLoad = () => {
    return (
      <View style={styles.loaderContainer}>
        <LootieView
          source={loaderLootie}
          style={{ height: 100 }}
          resizeMode="cover"
          loop
          autoPlay
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.cardContainer}>
          <View style={styles.cardItem}>
            <View style={styles.cardImage}>
              {item.product &&
                item.product.images &&
                item.product.images.length > 0 ? (
                  <Image
                    source={{ uri: item.product.images[0] }}
                    style={styles.BoxShoperImg}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={noImage}
                    style={styles.BoxShoperImg}
                    resizeMode="contain"
                  />
                )}
            </View>
            <View style={styles.cardInfo}>
              <Text numberOfLines={1}>{item?.product?.name}</Text>
              <Text numberOfLines={1} style={styles.priceTxt}>
                {formatMoney(
                  item?.product?.pricePromotion || item?.product?.price,
                )}
              </Text>
            </View>
            <View style={styles.cardTotal}>
              <Text style={styles.textCardTotal}>
                {'x' + item.product.amount}
              </Text>
            </View>
          </View>
        </View>

        {item.isEditable && item.editableItem ? (
          <>
            <View style={styles.cardReplaceProduct}>
              <TouchableOpacity
                style={styles.cardReplaceContent}
                onPress={() => showItem(item.index)}>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={styles.cardReplaceTitle}>
                    Produto substituido {item?.shopper || ''}
                  </Text>
                </View>
                <View>
                  {item.editableVisble === false ? (
                    <Icon
                      name={'keyboard-arrow-down'}
                      size={30}
                      style={styles.cardReplaceIcon}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>

            {item.editableVisble ? (
              <View style={[styles.cardProductOld]}>
                <View style={styles.cardItem}>
                  <View style={styles.cardImage}>
                    <Image
                      source={noImage}
                      style={styles.BoxShoperImg}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text numberOfLines={1}>{item?.editableItem?.name}</Text>
                    <Text numberOfLines={1} style={styles.priceTxt}>
                      {formatMoney(
                        item?.editableItem?.pricePromotion ||
                        item.editableItem.price,
                      )}
                    </Text>
                  </View>
                  <View style={styles.cardTotal}>
                    <Text style={styles.textCardTotal}>
                      x{item.editableItem?.amount}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.productOldIcon}
                  onPress={() => showItem(item.index)}>
                  <Icon
                    name={'keyboard-arrow-up'}
                    size={30}
                    style={styles.cardReplaceIcon}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </>
        ) : null}

        <View style={styles.line} />
      </>
    );
  };

  const ListFooterComponent = () => {
    return (
      <>
        {listAdd ? addedProductShopper() : null}
        {listRemoved ? removedProductShopper() : null}
      </>
    );
  };

  const removedProductShopper = () => (
    <View style={styles.flatCardFooter}>
      <Text style={styles.cardFooterTxt}>Itens Removidos</Text>

      {listRemoved.map(producRemoved => {
        return (
          <View style={styles.cardContainerRemove}>
            <View style={styles.cardItemRemove}>
              <View style={styles.cardImage}>
                {producRemoved.product.images &&
                  producRemoved.product.images.length > 0 ? (
                    <Image
                      source={{ uri: producRemoved.product.images[0] }}
                      style={styles.BoxShoperImg}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={noImage}
                      style={styles.BoxShoperImg}
                      resizeMode="contain"
                    />
                  )}
              </View>
              <View style={styles.cardInfo}>
                <Text numberOfLines={1}>{producRemoved.product.name}</Text>
                <Text numberOfLines={1}>
                  {formatMoney(
                    producRemoved?.product?.pricePromotion ||
                    producRemoved?.product?.price,
                  )}
                </Text>
              </View>
              <View style={styles.cardTotalRemove}>
                <Text style={styles.textCardTotal}>
                  {'x' + producRemoved.product?.amount}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );

  const addedProductShopper = () => {
    return (
      <View style={styles.flatCardFooter}>
        <Text style={[styles.cardFooterTxt, styles.footerAddColor]}>
          Itens Adicionados
        </Text>

        {listAdd.map(producAdded => {
          return (
            <View style={styles.cardContainerRemove}>
              <View style={styles.cardItemRemove}>
                <View style={styles.cardImage}>
                  {producAdded.product.images &&
                    producAdded.product.images.length > 0 ? (
                      <Image
                        source={{ uri: producAdded.product.images[0] }}
                        style={styles.BoxShoperImg}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={noImage}
                        style={styles.BoxShoperImg}
                        resizeMode="contain"
                      />
                    )}
                </View>
                <View style={styles.cardInfo}>
                  <Text numberOfLines={1}>{producAdded.product.name}</Text>
                  <Text numberOfLines={1}>
                    {formatMoney(
                      producAdded?.product?.pricePromotion ||
                      producAdded?.product?.price,
                    )}
                  </Text>
                </View>
                <View style={styles.cardTotalRemove}>
                  <Text style={styles.textCardTotal}>
                    {'x' + producAdded.product?.amount}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <Icon
              name="navigate-before"
              size={45}
              style={styles.headerBefore}
            />
          </TouchableOpacity>

          <View style={styles.titleContent} activeOpacity={1}>
            <Text style={styles.headerTitle}>ITENS DO PEDIDO</Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={{ flexShrink: 1 }}>
        <View style={styles.cardTitle}>
          <Text style={styles.titleCard}>Itens do carrinho</Text>
          <Icon name={'list'} size={30} style={styles.iconTitle} />
        </View>

        {load === true ? (
          getLoad()
        ) : (
            <FlatList
              data={listProducts}
              keyExtractor={item => item.index}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={renderItem}
              ListFooterComponent={ListFooterComponent}
            />
          )}
      </View>
    </View>
  );
};

export default PaymentStatusItems;
