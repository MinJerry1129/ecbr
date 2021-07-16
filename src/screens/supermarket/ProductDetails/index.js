/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import CartAdd from '../../../components/product/cartAdd';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

/* Components */
import ValidationLocation from '../product/components/validationLocation';
import BtnCart from '../../../components/product/btnCart';

/* Services */
import {
  StorageGet,
  StorageSet,
  StorageClean,
} from '../../../services/deviceStorage';
import { listOne, relatedProduct } from '../../../services/service/product';
import {
  listAlertProduct,
  updateAlertProduct,
  createAlertProduct,
} from '../../../services/service/customer/alertProduct';
import { listOne as companyOne } from '../../../services/service/company';
import { isAuthenticated } from '../../../services/userAuth';

import { connect } from 'react-redux';
import { getToCart } from '../../../store/actions/cart';
import Cart from '../cart';

/** Util */
import { toastShow } from '../../../utils';
import {
  calcDiscount,
  calcDiscountPercent,
} from '../../../utils/screens/product';
import { formatMoney } from '../../../utils';

/** Styles */
import styles, { ViewImageContent, ViewClickItem, ViewImage } from './styles';
import { Colors } from '../../../styles';

const ProductDetails = ({
  navigation,
  qtdProd,
  price,
  cartLoading,
  onGetToCart,
}) => {
  const route = useRoute();

  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(true);
  const [company, setCompany] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [modalCart, setModalCart] = useState(false);
  const addProduct = route.params?.addProduct ?? null;
  const [related, setRelated] = useState([]);
  const [listAlert, setListAlert] = useState([]);
  const [productLoad, setProductLoad] = useState(false);
  const [modalValidation, setModalValidation] = useState(false);

  const noImage = require('../../../assets/images/product/no_image.png');
  const imageLoad = require('../../../assets/images/product/image_load.png');
  const imageBellOn = require('../../../assets/images/alert/sino-on.png');
  const imageBellOff = require('../../../assets/images/alert/sino-off.png');

  const getProduct = async idProduct => {
    setLoad(true);
    const result = await listOne(idProduct);

    if (result) {
      getRelatedProducts(result._id);
      setProduct(result);
    }

    setLoad(false);
  };

  useEffect(() => {
    const idProduct = route.params?.idProduct ?? null;
    const companyParam = route.params?.company ?? null;

    if (companyParam && companyParam._id) {
      onGetToCart(companyParam._id);
    }

    const runProduct = async () => {
      let companyResponse = await getCompanyDelivery(companyParam);
      if (companyResponse) {
        setCompany(companyResponse);
        if (
          companyResponse.companyDelivery &&
          companyResponse.companyDelivery.min_purchase &&
          companyResponse.companyDelivery.min_purchase > 0
        ) {
          setMinPrice(companyResponse.companyDelivery.min_purchase);
        }

        await StorageSet('company', companyResponse);
      }

      await getListAlertProduct();
    };

    getProduct(idProduct);
    runProduct();
  }, []);

  const getCompanyDelivery = async companyLocal => {
    try {
      if (
        !companyLocal ||
        !companyLocal.deliveryPrice ||
        !companyLocal.companyDelivery
      ) {
        let respAddress = await StorageGet('@addressUser');
        if (
          respAddress &&
          respAddress.location &&
          respAddress.location.coordinates
        ) {
          let companyResp = await companyOne(companyLocal._id, {
            delivery: true,
            latitude: respAddress.location.coordinates[1],
            longitude: respAddress.location.coordinates[0],
          });
          return companyResp;
        }
      }

      return companyLocal;
    } catch (err) {
      return companyLocal;
    }
  };

  const getRelatedProducts = async id => {
    const relatedResponse = await relatedProduct({
      productId: id,
    });
    if (relatedResponse) {
      setRelated(relatedResponse);
    }
  };

  const cartScreen = () => {
    setModalCart(true);
  };

  const closeModal = () => {
    setModalCart(false);
  };

  const Back = () => {
    let routeBack = route.params?.goBack;

    if (routeBack && routeBack === 'Supermarket') {
      return navigation.replace('Product', {
        company: company,
      });
    }

    navigation.goBack();
  };

  const getListAlertProduct = async () => {
    let response = await StorageGet('@customer_alert_product');
    if (response) {
      setListAlert(response);
      return;
    }

    const { user: userAuth } = await isAuthenticated();
    if (!userAuth._id) {
      return;
    }

    const respAlertProduct = await listAlertProduct({
      customer: userAuth._id,
    });

    if (respAlertProduct) {
      await StorageSet('@customer_alert_product', respAlertProduct);
      setListAlert(respAlertProduct);
    }
  };

  const clickAlertProduct = async productItem => {
    let productId = productItem?._id;
    let companyId = productItem?.company._id || productItem?.company;

    if (!productId || !companyId) {
      return;
    }

    setProductLoad(true);
    let respAlert = await StorageGet('@customer_alert_product');
    let index = null;
    let listResp = null;

    if (respAlert) {
      index = respAlert.find(item => item.product === productId);
    }

    const { user: userAuth } = await isAuthenticated();

    if (index) {
      await updateAlertProduct(index._id, { product: productItem._id });
      listResp = await listAlertProduct({ customer: userAuth?._id });

      if (listResp) {
        await StorageSet('@customer_alert_product', listResp);
      } else {
        await StorageClean('@customer_alert_product');
      }

      toastShow(
        'Você deixará de ser notificado quando esse produto ficar mais barato!',
        'DEFAULT',
        3000,
      );

      setListAlert(listResp);
      setProductLoad(false);
      return;
    }

    await createAlertProduct({
      customer: userAuth?._id,
      product: productId,
      company: companyId,
    });

    listResp = await listAlertProduct({ customer: userAuth?._id });

    if (listResp) {
      await StorageSet('@customer_alert_product', listResp);
    } else {
      await StorageClean('@customer_alert_product');
    }

    toastShow(
      'Você será notificado quando esse produto ficar mais barato!',
      'DEFAULT',
      3000,
    );

    setProductLoad(false);
    setListAlert(listResp);
  };

  const checkBell = (item, sizeIcon = 1) => {
    let iconOn = false;

    if (listAlert != null) {
      let index = listAlert.find(el => el.product === item?._id);
      if (index) {
        iconOn = true;
      }
    }

    if (productLoad && productLoad === item?._id) {
      return (
        <View style={styles.bellContainer}>
          <ActivityIndicator size="small" style={styles.bellLoad} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.bellContainer}
        onPress={() => clickAlertProduct(item)}>
        <Image
          source={iconOn ? imageBellOn : imageBellOff}
          resizeMode="contain"
          style={styles.bellIcon}
        />
      </TouchableOpacity>
    );
  };

  const openModalValidation = () => {
    setModalValidation(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalCart}
        onRequestClose={() => setModalCart(false)}>
        <Cart close={closeModal} navigation={navigation} />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalValidation}
        onRequestClose={() => setModalValidation(false)}>
        <ValidationLocation
          statusModal={setModalValidation}
          navigation={navigation}
        />
      </Modal>

      <TouchableOpacity style={styles.header} onPress={() => Back()}>
        <Icon name="keyboard-arrow-down" size={40} color={Colors.PRIMARY} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          {checkBell(product)}
          <ViewImageContent copyright={product.copyright}>
            {load === false && product.images ? (
              <Image
                style={styles.productImage}
                defaultSource={imageLoad}
                source={{
                  uri: product.images[0],
                }}
                resizeMode="contain"
              />
            ) : (
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
              )}
          </ViewImageContent>
          <View style={styles.infoContent}>
            <View style={styles.BoxInfo}>
              <Text style={styles.titleProduct}>{product.name}</Text>
              <Text numberOfLines={2}> {product.description} </Text>
              <View style={styles.BoxPrice}>
                {product.pricePromotion ? (
                  <>
                    <Text style={styles.price}>
                      {formatMoney(product.pricePromotion)}
                    </Text>
                    <Text style={styles.OldPrice}>
                      {formatMoney(product.price)}
                    </Text>
                  </>
                ) : (
                    <Text style={styles.price}>{formatMoney(product.price)}</Text>
                  )}
              </View>
            </View>
            {product._id ? (
              <CartAdd
                item={product}
                company={company}
                navigation={navigation}
                addProduct={addProduct}
                ProductDetails={true}
                openModalValidation={openModalValidation}
              />
            ) : null}
          </View>
          <View style={styles.BoxRelatedProducts}>
            <Text style={styles.BoxRelatedProductsTitle}>
              Produtos relacionados
            </Text>
            <FlatList
              contentContainerStyle={{ height: 250 }}
              onEndReachedThreshold={0.1}
              progressViewOffset={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={related}
              keyExtractor={item => item._id}
              renderItem={({ item }) =>
                item.name !== product.name ? (
                  <ViewClickItem
                    copyright={item.copyright}
                    onPress={() => getProduct(item._id)}>
                    {checkBell(item)}
                    {item.images && item.images.length > 0 ? (
                      <ViewImage copyright={item.copyright}>
                        <Image
                          style={styles.productImg}
                          defaultSource={noImage}
                          source={{ uri: item.images[0] }}
                          resizeMode="contain"
                        />
                      </ViewImage>
                    ) : (
                        <Image
                          source={imageLoad}
                          style={styles.productImg}
                          resizeMode="contain"
                        />
                      )}
                    <View style={styles.BoxInfoR}>
                      <View style={styles.priceContainer}>
                        <Text style={styles.txtValue}>
                          {item.pricePromotion
                            ? formatMoney(item.pricePromotion)
                            : formatMoney(item.price)}
                        </Text>
                        {item.pricePromotion ? (
                          <>
                            <Text style={styles.pricePromotion}>
                              {formatMoney(item.price)}
                            </Text>
                          </>
                        ) : null}
                      </View>

                      {item.pricePromotion ? (
                        <View style={styles.discountContainer}>
                          <Text style={styles.txtDiscount}>
                            {calcDiscount(item.price, item.pricePromotion)}
                          </Text>
                          <Text style={styles.txtPercent}>
                            {calcDiscountPercent(
                              item.price,
                              item.pricePromotion,
                            )}
                          </Text>
                        </View>
                      ) : null}

                      <Text style={styles.txtNameProd} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.txtNameProd} numberOfLines={1}>
                        {item.description}
                      </Text>
                    </View>
                    <CartAdd
                      item={item}
                      company={company}
                      navigation={navigation}
                      openModalValidation={openModalValidation}
                    />
                  </ViewClickItem>
                ) : null
              }
            />
          </View>
        </View>
      </ScrollView>
      {qtdProd && qtdProd && company !== null > 0 ? (
        <View style={styles.footer}>
          <BtnCart
            onPress={cartScreen}
            qtd={qtdProd}
            price={price}
            loading={cartLoading}
            remainingPrice={minPrice > 0 ? minPrice - price : 0}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const mapStateToProps = ({ cart }) => {
  let cartResult = cart.cart ? cart.cart : [];
  return {
    cartLoading: cart.loading ? cart.loading : false,
    qtdProd: cartResult.length,
    price: cartResult.reduce((total, product) => {
      let priceProd = product.price;
      if (product.pricePromotion && product.pricePromotion > 0) {
        priceProd = product.pricePromotion;
      }

      return total + priceProd * product.amount;
    }, 0),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetToCart: company => dispatch(getToCart(company)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetails);
