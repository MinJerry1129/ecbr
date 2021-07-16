/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import LootieView from 'lottie-react-native';

/* Redux */
import { getToCart } from '../../../store/actions/cart';

/** Service */
import {
  listProductOffer,
  listProductDepartments,
  listSearchProduct,
} from '../../../services/service/product';
import {
  StorageClean,
  StorageGet,
  StorageSet,
} from '../../../services/deviceStorage';
import { getAuthenticated } from '../../../services/userAuth';
import {
  updateCustomer,
  listCustomerSearch,
} from '../../../services/service/customer';
import { isAuthenticated } from '../../../services/userAuth';
import { listAlertProduct } from '../../../services/service/customer/alertProduct';

/** Components */
import Cart from '../cart';
import CartAdd from '../../../components/product/cartAdd';
import Departments from './components/departments';
import ValidationLocation from './components/validationLocation';
import ProductsNotDepartment from './components/productsNotDepartment';
import BtnCart from '../../../components/product/btnCart';
import ProductFavorite from '../components/productFavorite';

/** Util */
import { toastShow, formatMoney } from '../../../utils';
import {
  minPurchase,
  maxAmountItems,
  calcDiscount,
  calcDiscountPercent,
} from '../../../utils/screens/product';
import loaderLootie from '../../../assets/animations/loader.json';

/* Styles */
import { Colors } from '../../../styles';
import styles, { SearchInput, ViewClickItem, ViewProductImage } from './styles';

const Product = ({
  route,
  navigation,
  onGetToCart,
  qtdProd,
  price,
  cartLoading,
  messageError,
}) => {
  const imgHeader = require('../../../assets/images/product/background.jpg');

  const [modalCart, setModalCart] = useState(false);
  const [enableScrollViewScroll, setScrollViewScroll] = useState(true);
  const [listOffers, setListOffers] = useState([]);
  const [productSearch, setProductSearch] = useState([]);
  const [totalProductSearchPage, setTotalProductSearchPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [productSearchPage, setProductSearchPage] = useState(1);
  const [notSearch, setNotSearch] = useState(false);
  const [listAlert, setListAlert] = useState(null);
  const [company, setCompany] = useState(() => {
    return route.params?.company ?? null;
  });
  const [favorite, setFavorite] = useState(false);
  const [customerId, setCustomerId] = useState([]);
  const [favoriteSupermarkets, setFavoriteSupermarkets] = useState([]);
  const [page, setPage] = useState(0);
  const [flatLoad, setFlatLoad] = useState(false);
  const [productsDepartments, setProductsDepartments] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOld, setSearchOld] = useState('');
  const [productPage, setProductPage] = useState(1);
  const [totalProductPage, setTotalProductPage] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [load, setLoad] = useState(false);
  const [modalValidation, setModalValidation] = useState(false);

  const noImage = require('../../../assets/images/product/no_image.png');
  const imageLoad = require('../../../assets/images/product/image_load.png');

  let coupon = route.params?.coupon ?? null;
  let openCart = route.params?.openCart ?? null;

  useFocusEffect(
    useCallback(() => {
      products();
    }, []),
  );

  useEffect(() => {
    if (messageError && messageError.message) {
      toastShow(messageError.message, 'ALERT');
    }
  }, [messageError]);

  useEffect(() => {
    if (!search && productSearch && productSearch.length > 0) {
      products();
      setProductSearch([]);
    }
  }, [search]);

  const products = async () => {
    setLoadingFavorites(true);

    if (company !== null) {
      if (
        company.companyDelivery &&
        company.companyDelivery.min_purchase &&
        company.companyDelivery.min_purchase > 0
      ) {
        setMinPrice(company.companyDelivery.min_purchase);
      }

      onGetToCart(company._id);
      StorageSet('company', company);

      getProductsDepartments();
      const resultUser = await getAuthenticated();

      if (resultUser === false) {
        navigation.navigate('Login', {
          screen: 'login',
        });
        return;
      }

      setCustomerId(resultUser.user._id);

      const customer = await listCustomerSearch({
        email: resultUser.user.email,
      });

      if (customer && customer.favoriteSupermarkets) {
        setFavoriteSupermarkets(customer.favoriteSupermarkets);

        if (customer.favoriteSupermarkets.includes(company._id)) {
          setFavorite(true);
        }
      }
    }

    if (openCart) {
      cartScreen();
    }

    setLoadingFavorites(false);
  };

  const back = () => {
    navigation.navigate('Supermarket', {
      screen: 'Supermarket',
    });
  };

  const cartScreen = () => {
    setModalCart(true);
  };

  const closeModal = async () => {
    setModalCart(false);
    await onGetToCart(company._id);
  };

  const details = (id, getAllProducts) => {
    navigation.navigate('ProductDetails', {
      idProduct: id,
      company: company,
      relatedProducts: getAllProducts,
    });
  };

  const updateFavoriteCompany = async () => {
    let newFavoritesSupermarkets = favoriteSupermarkets;

    if (!favorite) {
      const result = favoriteSupermarkets.find(
        favoriteSupermarket => favoriteSupermarket === company._id,
      );

      if (!result) {
        newFavoritesSupermarkets.push(company._id);
        toastShow(
          'Estabelecimento adicionado aos seus favoritos.',
          'DEFAULT',
          3000,
        );
      }
    } else {
      newFavoritesSupermarkets = favoriteSupermarkets.filter(r => {
        if (r !== company._id) {
          return r;
        }
      });

      setFavoriteSupermarkets(newFavoritesSupermarkets);

      toastShow(
        'Estabelecimento removido aos seus favoritos.',
        'DEFAULT',
        3000,
      );
    }

    setFavorite(!favorite);

    await updateCustomer(customerId, {
      favoriteSupermarkets: newFavoritesSupermarkets,
    });
  };

  const infoDelivery = companyCurrent => {
    try {
      let minPriceCart = minPurchase(companyCurrent);
      let maxDelivery = maxAmountItems(companyCurrent, '');
      let str = '';

      if (minPriceCart && minPriceCart !== '') {
        str += `${minPriceCart}`;
      }

      if (maxDelivery && maxDelivery !== '') {
        str += ` - até ${maxDelivery} `;
      }

      return str;
    } catch (err) {
      return '';
    }
  };

  const loadProducts = async () => {
    try {
      setPage(page + 1);
      setNotSearch(false);

      if (page > 0) {
        setFlatLoad(true);
      }

      let resultProduct = await listProductOffer(route.params?.company._id, {
        limit: 10,
        page,
      });

      if (resultProduct.length === 0) {
        return;
      }

      if (!resultProduct || resultProduct.length <= 0) {
        setNotSearch(true);
      }

      setListOffers([...listOffers, ...resultProduct]);
    } catch (err) {
      setFlatLoad(false);
    } finally {
      setFlatLoad(false);
    }
  };

  const getProductsDepartments = async () => {
    try {
      setLoad(true);
      let companyParam = route.params?.company ?? null;
      let idCompany = companyParam ? companyParam._id : null;
      let resp = await listProductDepartments(idCompany, 1, 3);

      if (resp.list && resp.list.length > 0) {
        await getListAlertProduct();
        setProductsDepartments(resp.list);
        setProductPage(1);
        setTotalProductPage(resp.pages);
      } else {
        await loadProducts();
      }

      setLoad(false);
    } catch (err) {
      console.log('View productsDepartments', err);
    }
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
    } else {
      setListAlert([]);
      await StorageClean('@customer_alert_product');
    }
  };

  const getAndSetSearch = async (limit, pageProductsSearch) => {
    let emptyPage = pageProductsSearch || 1;
    let limitPage = limit || 10;

    if (search) {
      let companyParam = route.params?.company ?? null;
      let idCompany = companyParam ? companyParam._id : null;

      if (emptyPage === 1) {
        setLoad(true);
      }

      let resp = await listSearchProduct(
        idCompany,
        search,
        limitPage,
        emptyPage,
      );

      if (resp.list && resp.list.length > 0) {
        if (search === searchOld) {
          setSearchOld(search);
          setTotalProductSearchPage(resp.pages);
          createRows([...productSearch, ...resp.list], 2);
          setLoad(false);
          setNotSearch(false);
          return setProductSearch([...productSearch, ...resp.list]);
        } else {
          setSearchOld(search);
          setTotalProductSearchPage(resp.pages);
          createRows([...resp.list], 2);
          setLoad(false);
          setNotSearch(false);
          return setProductSearch([...resp.list]);
        }
      } else {
        setLoad(false);
        setSearchOld(search);
        if (emptyPage === 1) {
          return setNotSearch(true);
        }
        return;
      }
    }

    setLoad(false);
    setNotSearch(false);
    setProductSearch([]);
    getProductsDepartments();
  };

  const refreshListProductsSearch = async () => {
    setIsLoad(true);
    if (productSearchPage < totalProductSearchPage) {
      setProductSearchPage(productSearchPage + 1);
      await getAndSetSearch(10, productSearchPage + 1);
    }
    setIsLoad(false);
  };

  const createRows = (data, columns) => {
    const getRows = Math.floor(data.length / columns);

    let lastRowElements = data.length - getRows * columns;

    while (lastRowElements !== columns) {
      data.push({
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true,
      });
      lastRowElements += 1;
    }

    return setRows(data);
  };

  const openModalValidation = () => {
    setModalValidation(true);
  };

  const showToastAlertProduct = showToastProduct => {
    console.log(showToastProduct);
    if (showToastProduct) {
      toastShow(
        'Você será notificado quando esse produto ficar mais barato!',
        'DEFAULT',
        3000,
      );
    } else {
      toastShow(
        'Você deixará de ser notificado quando esse produto ficar mais barato!',
        'DEFAULT',
        3000,
      );
    }
  };

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={styles.BoxSearchItemEmpty} />;
    }

    return (
      <View style={styles.itemSearch}>
        <ViewClickItem
          copyright={item.copyright}
          onPress={() => details(item._id, products)}>
          <ProductFavorite
            item={item}
            listAlert={listAlert}
            customerId={customerId}
            showToastAlertProduct={showToastAlertProduct}
          />
          {item.images && item.images.length > 0 ? (
            <ViewProductImage
              copyright={item.copyright}
              defaultSource={noImage}
              source={{ uri: item.images[0] }}
              resizeMode="contain"
            />
          ) : (
              <ViewProductImage
                copyright={item.copyright}
                source={imageLoad}
                resizeMode="contain"
              />
            )}
          <View style={styles.BoxInfo}>
            {item.pricePromotion ? (
              <>
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
                <View style={styles.discountContainer}>
                  <Text style={styles.txtDiscount}>
                    {calcDiscount(item.price, item.pricePromotion)}
                  </Text>
                  <Text style={styles.txtPercent}>
                    {calcDiscountPercent(item.price, item.pricePromotion)}
                  </Text>
                </View>
              </>
            ) : (
                <View style={styles.priceContainer}>
                  <Text style={styles.priceNormal}>
                    {formatMoney(item.price)}
                  </Text>
                </View>
              )}

            <Text style={styles.txtNameProd} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        </ViewClickItem>

        <CartAdd
          item={item}
          company={company}
          navigation={navigation}
          openModalValidation={openModalValidation}
        />
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.flatFooter}>
        {isLoad && isLoad === true ? (
          <ActivityIndicator size="large" style={styles.flatIconLoad} />
        ) : null}
      </View>
    );
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

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalCart}
        onRequestClose={() => setModalCart(false)}>
        <Cart close={closeModal} navigation={navigation} coupon={coupon} />
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
      <ImageBackground style={styles.imgBackground} source={imgHeader}>
        <View style={styles.BoxCompany}>
          <TouchableOpacity onPress={() => back()}>
            <Icon name="navigate-before" size={40} color={Colors.WHITE} />
          </TouchableOpacity>
          {company.images && (
            <View style={styles.BoxLogo}>
              <Image
                style={styles.logo}
                source={{ uri: company.images[0] }}
                resizeMode="contain"
              />
            </View>
          )}
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.TitleCompany} numberOfLines={2}>
              {company.name && company.name.length > 0
                ? `${company.name}`
                : '-'}
              {company && company.companyDelivery?.isOpen === false
                ? ' - Fechado'
                : ''}
            </Text>
          </View>
        </View>
        <View style={styles.boxIcons}>
          {!loadingFavorites && (
            <TouchableOpacity onPress={() => updateFavoriteCompany()}>
              {favorite ? (
                <Icon name="favorite" size={30} color={Colors.WHITE} />
              ) : (
                  <Icon name="favorite-border" size={30} color={Colors.WHITE} />
                )}
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
      <View style={styles.searchContainer}>
        <SearchInput
          autoCapitalize="none"
          placeholder="Buscar produtos"
          placeholderTextColor={Colors.DARK}
          returnKeyType="search"
          onChangeText={setSearch}
          value={search}
          onSubmitEditing={() => getAndSetSearch()}
        />
        <TouchableOpacity onPress={() => getAndSetSearch()}>
          <Icon name="search" size={28} color={Colors.GRAY_DARK} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerInfo}>
        {company?.companyDelivery?.min_purchase > 0 && (
          <Icon name="monetization-on" size={15} color={Colors.GREY} />
        )}
        <Text style={styles.headerInfoText}>{infoDelivery(company)}</Text>
      </View>
      {load === true ? (
        getLoad()
      ) : (
          <>
            {notSearch ? (
              <View style={styles.notProduct}>
                <Text>Nenhum Produto encontrado!!</Text>
              </View>
            ) : productSearch && productSearch.length ? (
              <View style={{ flex: 1, marginBottom: 100 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={rows}
                  onEndReachedThreshold={0.1}
                  onEndReached={() => refreshListProductsSearch()}
                  keyExtractor={item => `${item._id}`}
                  contentContainerStyle={styles.BoxItemSearch}
                  numColumns={2}
                  renderItem={renderItem}
                  ListFooterComponent={renderFooter()}
                />
              </View>
            ) : (
                  <View style={{ flex: 1 }}>
                    {productsDepartments && productsDepartments.length && company ? (
                      <Departments
                        route={route}
                        productsDepartments={productsDepartments}
                        company={company}
                        customerId={customerId}
                        details={details}
                        productPage={productPage}
                        totalProductPage={totalProductPage}
                        openModalValidation={openModalValidation}
                        listAlert={listAlert}
                      />
                    ) : null}

                    {listOffers && listOffers.length > 0 ? (
                      <ProductsNotDepartment
                        listOffers={listOffers}
                        onLoadMore={loadProducts}
                        setScrollViewScroll={setScrollViewScroll}
                        details={details}
                        company={company}
                        flatLoad={flatLoad}
                        openModalValidation={openModalValidation}
                      />
                    ) : null}
                  </View>
                )}
          </>
        )}
      <View style={styles.btnCart}>
        <BtnCart
          onPress={cartScreen}
          qtd={qtdProd}
          price={price}
          loading={cartLoading}
          remainingPrice={minPrice > 0 ? minPrice - price : 0}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({ cart, user }) => {
  // Sum amount itens cart
  let sumItens;
  if (cart && cart.cart && cart.cart.length) {
    sumItens = cart.cart
      .map(item => item.amount)
      .reduce((prev, next) => prev + next);
  }

  return {
    cartLoading: cart.loading ? cart.loading : false,
    qtdProd: sumItens || cart.cart.length,
    price: cart.subTotal,
    messageError: cart?.messageError ?? null,
    userAuth: user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetToCart: company => dispatch(getToCart(company), {}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Product));
