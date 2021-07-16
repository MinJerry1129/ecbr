/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import {
  getToCart,
  cleanToCart,
  removeCartRestaurant,
} from '../../../store/actions/cart';
import { formatMoney } from '../../../utils';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { Colors } from '../../../styles';
import { listItemComplement } from '../../../services/service/Food';
import {
  priceNormal,
  pricePromotion,
} from '../../../utils/screens/productRestaurantUtils';
import OptionsItem from '../cart/optionsItem';
import { listCompanyCouponsAvailable } from '../../../services/service/coupon/list';
import { listOrderCustomer } from '../../../services/service/shopping/order';
import { StorageGet } from '../../../services/deviceStorage';
import CardCoupon from '../../../components/coupon/cardCoupon';
import { toastShow } from '../../../utils';
import { isAuthenticated } from '../../../services/userAuth';
import deliveryPrice from './components/deliveryPrice';

// LogBox.ignoreAllLogs(true);

const Cart = ({
  close,
  navigation,
  cartUser,
  subTotal,
  companyParam,
  deliveryFee,
  total,
  onGetToCart,
  onRemoveCart,
  loading,
  coupon,
}) => {
  const [coupons, setCoupons] = useState([]);
  const [company, setCompany] = useState([]);
  const [components, setComponents] = useState([]);
  const [enableScrollViewScroll, setScrollViewScroll] = useState(true);
  const [modalOptions, setModalOptions] = useState(false);
  const [itemCurrent, setItemCurrent] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [firstOrder, setFirstOrder] = useState(false);
  const [contentMessage, setContentMessage] = useState({
    message: null,
    type: null,
  });
  const noImage = require('../../../assets/images/product/no_image.png');

  useFocusEffect(
    useCallback(() => {
      runCompany();
      orderCustomer();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (cartUser.length <= 0) {
        close();
        return;
      }

      isValidCart();
    }, [cartUser]),
  );

  useFocusEffect(
    useCallback(() => {
      if (company && company._id) {
        getCouponQuantity();
      }
    }, [company]),
  );

  const orderCustomer = async () => {
    const { user: userAuth } = await isAuthenticated();

    const result = await listOrderCustomer(userAuth._id);

    setFirstOrder(!result.result);
  };

  const runCompany = async () => {
    const resp = await StorageGet('company');

    if (resp) {
      setCompany(resp);
      onGetToCart(resp._id);
    }
    setComponents(await listItemComplement());
  };

  const getCouponQuantity = async () => {
    const { user: userAuth } = await isAuthenticated();
    const resp = await listCompanyCouponsAvailable(
      company._id,
      subTotal,
      userAuth.person?._id,
    );
    setCoupons(resp);
  };

  const isValidCart = () => {
    try {
      if (!company || !company._id) {
        return;
      }

      let min = company?.companyDelivery?.min_purchase ?? 0;
      let max = company?.companyDelivery?.max_amount_items ?? 0;

      if (!company) {
        setIsValid(false);
        return;
      }

      if (min === 0) {
        setIsValid(true);
        return;
      }

      if (subTotal < min) {
        setIsValid(false);
        setContentMessage({
          message: `Compra Mínima de ${formatMoney(min)}`,
          type: 'ALERT',
        });
        return;
      }

      let qtdMax = cartUser.reduce((t, el) => {
        if (el.amount) {
          t += el.amount;
        }
        return t;
      }, 0);

      if (max && qtdMax > max) {
        setIsValid(false);
        setContentMessage({
          message: `Permitido até  ${max} itens`,
          type: 'ALERT',
        });
        return;
      }

      setIsValid(true);
    } catch (err) {
      setIsValid(false);
    }
  };

  const editItem = () => {
    close();
    if (itemCurrent) {
      let itens = null;

      if (itemCurrent.params && itemCurrent.params.cartItem) {
        itens = itemCurrent.params.cartItem;
      } else {
        itens = itemCurrent;
      }

      navigation.navigate('AccessoriesProductDetails', {
        cartItem: itens,
        idProduct: itens.product._id,
        company: company,
      });
    }
  };

  const removeItem = () => {
    if (itemCurrent) {
      onRemoveCart(itemCurrent);
      if (cartUser && cartUser.length < 1) {
        close();
        navigation.navigate('AccessoriesProduct', {
          company: company,
        });
      }
    }
  };

  const optionsModal = item => {
    setItemCurrent(item);
    setModalOptions(true);
  };

  const finishPurchase = () => {
    if (company && company.companyDelivery?.isOpen === false) {
      toastShow('O estabelecimento esta fechado no momento.', 'DEFAULT', 3000);
      close();
      return;
    }

    let type;
    let screen;

    if (company.type === 'supermarket') {
      type = 'Supermarket';
      screen = 'Product';
    } else if (company.type === 'accessories') {
      type = 'Accessories';
      screen = 'AccessoriesProduct';
    } else {
      type = 'Restaurant';
      screen = 'RestaurantProduct';
    }

    navigation.navigate('Shopping', {
      screen: 'DetailPayment',
      params: {
        pageRedirect: [type, screen],
        company,
        coupon,
      },
    });
  };

  const calcTotal = item => {
    let normal = priceNormal(item);
    let promotion = pricePromotion(item);

    if (promotion && promotion !== null && promotion > 0) {
      return (
        <View>
          <Text style={styles.txtPrice}>{formatMoney(promotion)}</Text>
          <Text style={styles.txtOld}>{formatMoney(normal)}</Text>
        </View>
      );
    } else {
      return <Text style={[styles.txtPrice]}>{formatMoney(normal)}</Text>;
    }
  };

  const discount = priceTotal => {
    try {
      if (coupon && coupon.price && coupon.price > 0) {
        priceTotal = total - coupon.price;
      }

      return formatMoney(priceTotal);
    } catch (err) {
      return formatMoney(priceTotal);
    }
  };

  const couponCart = () => {
    if (coupons.coupons && coupons.coupons.length > 0) {
      return (
        <CardCoupon
          company={company}
          navigation={navigation}
          subTotal={subTotal}
          coupons={coupons}
          cupom={coupon?.price}
          firstOrder={firstOrder}
        />
      );
    } else {
      return <View />;
    }
  };

  const disableBtn = () => {
    try {
      if (isValid && deliveryFee >= 0 && total > 0) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOptions}
          onRequestClose={() => setModalOptions(false)}>
          <OptionsItem
            item={itemCurrent}
            back={setModalOptions}
            edit={editItem}
            remove={removeItem}
          />
        </Modal>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => close()}>
            <Icon name="expand-more" size={30} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.txtHeader}>Carrinho</Text>
        </View>

        {contentMessage.type !== null && contentMessage.message !== null ? (
          <View
            style={[
              styles.contentMessage,
              contentMessage.type === 'ALERT' ? styles.backgroundAlert : '',
            ]}>
            <Text style={styles.txtMessageInfo}>{contentMessage.message}</Text>
          </View>
        ) : null}

        <View style={styles.scrooContainer}>
          <Text style={styles.txtTitle}>{company.name}</Text>
          <View style={styles.divider} />

          <View style={styles.containerProduct}>
            <FlatList
              scrollEnabled={true}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={styles.flatList}
              horizontal={false}
              data={cartUser}
              keyExtractor={item => `${item._id}`}
              onTouchStart={() => setScrollViewScroll(false)}
              onMomentumScrollEnd={() => setScrollViewScroll(true)}
              onStartShouldSetResponderCapture={() => {
                setScrollViewScroll(false);
                if (
                  this.refs.myList.scrollProperties.offset === 0 &&
                  enableScrollViewScroll === false
                ) {
                  setScrollViewScroll(true);
                }
              }}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity
                    style={styles.list}
                    onPress={() => optionsModal(item)}>
                    <View style={styles.imageContainer}>
                      {item?.product?.images ? (
                        <Image
                          style={styles.imageProduct}
                          source={{ uri: item.product.images[0] }}
                          resizeMode="contain"
                        />
                      ) : (
                          <Image
                            source={noImage}
                            style={styles.productImg}
                            resizeMode="contain"
                          />
                        )}
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      {(item.check && Object.keys(item.check).length > 0) ||
                        (item.radio && Object.keys(item.radio).length > 0) ? (
                          <>
                            <Text style={styles.txtNameProd}>{`${item.amount} x ${
                              item?.product?.name
                              }`}</Text>
                            <Text style={styles.titleComplement}>
                              {Object.keys(item.check).length +
                                Object.keys(item.radio).length}{' '}
                            complemento(s)
                          </Text>
                          </>
                        ) : (
                          <Text style={styles.txtNameProdAlone}>{`${
                            item.amount
                            } x ${item?.product?.name}`}</Text>
                        )}
                      {calcTotal(item)}
                    </View>
                  </TouchableOpacity>
                  <View style={styles.divider} />
                </>
              )}
            />
          </View>
        </View>
        {couponCart()}
        <View style={styles.subTotal}>
          <View style={styles.listSub}>
            <Text style={styles.subTitle}>SubTotal</Text>
            {subTotal !== undefined && subTotal >= 0 ? (
              <Text style={styles.subPrice}>{`${formatMoney(subTotal)}`}</Text>
            ) : (
                <ActivityIndicator
                  color={Colors.PRIMARY}
                  size="small"
                  style={{ width: 20, height: 20 }}
                />
              )}
          </View>

          {deliveryPrice(deliveryFee)}

          {coupon?.price > 0 ? (
            <View style={styles.listSub}>
              <Text style={styles.subTitle}>Cupom de Desconto</Text>
              <Text style={[styles.subPrice, styles.alertText]}>
                {`- ${formatMoney(coupon?.price)}`}
              </Text>
            </View>
          ) : null}

          <View style={styles.listSub}>
            <Text style={[styles.subTitle, styles.txtBold]}>Total</Text>
            {total !== undefined && total >= 0 ? (
              <Text style={[styles.subPrice, styles.txtBold]}>
                {discount(total)}
              </Text>
            ) : (
                <ActivityIndicator
                  color={Colors.PRIMARY}
                  size="small"
                  style={{ width: 15, height: 15 }}
                />
              )}
          </View>
        </View>

        <View style={styles.checkout}>
          {/* <View style={styles.btContainer}> */}
          <TouchableOpacity
            style={[styles.btnCheckout, !isValid ? styles.btnDisable : null]}
            onPress={() => finishPurchase()}
            disabled={!disableBtn()}>
            {disableBtn() ? (
              <Text style={styles.txtCheckout}>Finalizar Compra</Text>
            ) : (
                <ActivityIndicator
                  color={Colors.WHITE}
                  size="small"
                  style={[{ width: 17, height: 17 }, styles.txtCheckout]}
                />
              )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({ cart }) => {
  let total = cart.subTotal;

  if (cart.deliveryFee) {
    total += cart.deliveryFee;
  }

  return {
    loading: cart.loading,
    cartUser: cart.cart,
    idCompany: cart.company,
    subTotal: cart.subTotal,
    //subTotalNormal: cart.subTotalNormal,
    deliveryFee: cart.deliveryFee,
    total: total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetToCart: company =>
      dispatch(
        getToCart(company, {
          delivery: 'true',
          type: 'accessories',
        }),
      ),
    onCleanCart: () => dispatch(cleanToCart()),
    onRemoveCart: cartItem =>
      dispatch(
        removeCartRestaurant(cartItem, {
          delivery: 'true',
          type: 'accessories',
        }),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
