/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

/** Service */
import {
  nextProductsDepartments,
  listProductDepartments,
} from '../../../../services/service/product';
import {
  listAlertProduct,
  createAlertProduct,
  updateAlertProduct,
} from '../../../../services/service/customer/alertProduct';
import {
  StorageClean,
  StorageGet,
  StorageSet,
} from '../../../../services/deviceStorage';

/** Components */
import CartAdd from '../../../../components/product/cartAdd';

/** Util */
import {formatMoney} from '../../../../utils';
import stylesNew, {ViewClickItem, ViewProductImage} from '../styles';
import {Typography, Colors} from '../../../../styles';
import {
  calcDiscount,
  calcDiscountPercent,
} from '../../../../utils/screens/product';
import {toastShow} from '../../../../utils';

const Departments = ({
  route,
  productsDepartments,
  company,
  details,
  productPage,
  totalProductPage,
  openModalValidation,
  customerId,
  listAlert,
}) => {
  const [departmentIdLoad, setDepartmentIdLoad] = useState(null);
  const [departmentLazy, setDepartmentLazy] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [alertProduct, setListAlertProduct] = useState(listAlert);
  const [productPageChange, setProductPageChange] = useState(productPage);
  const [isLoadDepartments, setIsLoadDepartments] = useState(false);
  const [productLoad, setProductLoad] = useState(null);

  const noImage = require('../../../../assets/images/product/no_image.png');
  const imageLoad = require('../../../../assets/images/product/image_load.png');
  const imageBellOn = require('../../../../assets/images/alert/sino-on.png');
  const imageBellOff = require('../../../../assets/images/alert/sino-off.png');

  const getProductsDepartments = useCallback(
    async page => {
      try {
        let companyParam = route.params?.company ?? null;
        let idCompany = companyParam ? companyParam._id : null;
        let resp = await listProductDepartments(idCompany, page, 3);

        if (resp.list && resp.list.length > 0) {
          setListProducts([...productsDepartments, ...resp.list]);
        }
      } catch (err) {
        // console.log('View productsDepartments', err);
      }
    },
    [route],
  );

  const listDepartments = item => {
    return (
      <View style={styles.boxDepartment}>
        <Text style={styles.department}>{item?.name}</Text>
        {getListProducts(item)}
      </View>
    );
  };

  const lazyLoadDepartment = async (idDepartment, numberProducts) => {
    try {
      if (isLoad || numberProducts < 5) {
        return;
      }

      setIsLoad(true);
      setDepartmentIdLoad(idDepartment);
      let page = 1;
      let index = -1;

      if (!departmentLazy) {
        setDepartmentIdLoad(null);
        setIsLoad(false);
        return;
      }

      index = departmentLazy.findIndex(item => item._id === idDepartment);
      if (index >= 0) {
        page = departmentLazy[index].page + 1;
      }

      let respNext = await nextProductsDepartments(
        company._id,
        idDepartment,
        page,
      );

      if (respNext && respNext.length > 0) {
        if (index > -1) {
          let lazyBebore = [...departmentLazy];
          lazyBebore[index] = {
            _id: idDepartment,
            page: page,
          };

          setDepartmentLazy(lazyBebore);
        } else {
          // console.log('New setLazy');
          setDepartmentLazy([
            {
              _id: idDepartment,
              page: page,
            },
          ]);
        }

        updateListDepartment(idDepartment, respNext);
      } else {
        let index = listProducts.findIndex(item => item._id === idDepartment);
        if (index > -1) {
          let listBefore = [...listProducts];
          listBefore[index] = {
            ...listBefore[index],
            numberProducts: 0,
          };

          setListProducts(listBefore);
        }
      }

      setDepartmentIdLoad(null);
      setIsLoad(false);
    } catch (err) {
      // console.log('ops..', err);
      setDepartmentIdLoad(null);
      setIsLoad(false);
    }
  };

  const updateListDepartment = (idDepartment, products) => {
    try {
      let index = listProducts.findIndex(item => item._id === idDepartment);
      let listBefore = [...listProducts];
      let addProducts = [];

      for (const product of products) {
        addProducts.push(product);
      }

      listBefore[index] = {
        ...listBefore[index],
        products: [...listBefore[index].products, ...addProducts],
        numberProducts: products.length,
      };

      setListProducts(listBefore);
    } catch (err) {
      // console.log('Error updateListDepartment...', err);
    }
  };

  const renderFooter = idDepartment => {
    return (
      <View style={styles.flatFooter}>
        {departmentIdLoad && departmentIdLoad === idDepartment ? (
          <ActivityIndicator size="large" style={styles.flatIconLoad} />
        ) : null}
      </View>
    );
  };

  const renderFooterDepartments = () => {
    return (
      <View style={styles.flatFooter}>
        {isLoadDepartments && isLoadDepartments === true ? (
          <ActivityIndicator size="large" style={styles.flatIconLoad} />
        ) : null}
      </View>
    );
  };

  const refreshListProductsSearch = async () => {
    setIsLoadDepartments(true);
    if (productPageChange < totalProductPage) {
      setProductPageChange(productPageChange + 1);
      await getProductsDepartments(productPage + 1);
    }
    setIsLoadDepartments(false);
  };

  useEffect(() => {
    if (
      productsDepartments &&
      productsDepartments.length > 0 &&
      listProducts.length <= 0
    ) {
      setListProducts(productsDepartments);
    }
  }, [productsDepartments]);

  const clickAlertProduct = async product => {
    try {
      let productId = product?._id;
      let companyId = product?.company;

      if (!productId || !companyId) {
        return;
      }

      setProductLoad(productId);
      let respAlert = await StorageGet('@customer_alert_product');
      let index = null;
      let listResp = null;

      if (respAlert) {
        index = respAlert.find(item => item.product === productId);
      }

      if (index) {
        await updateAlertProduct(index._id, {product: product._id});
        listResp = await listAlertProduct({customer: customerId});

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

        setListAlertProduct(listResp);
        setProductLoad(null);
        return;
      }

      await createAlertProduct({
        customer: customerId,
        product: productId,
        company: companyId,
      });

      listResp = await listAlertProduct({customer: customerId});

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

      setProductLoad(null);
      setListAlertProduct(listResp);
    } catch (err) {}
  };

  const checkBell = item => {
    let iconOn = false;

    if (alertProduct != null) {
      let index = alertProduct.find(el => el.product === item?._id);
      if (index) {
        iconOn = true;
      }
    }

    if (productLoad && productLoad === item?._id) {
      return (
        <View style={stylesNew.bellContainer}>
          <ActivityIndicator size="small" style={stylesNew.bellLoad} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={stylesNew.bellContainer}
        onPress={() => clickAlertProduct(item)}>
        <Image
          source={iconOn ? imageBellOn : imageBellOff}
          resizeMode="contain"
          style={stylesNew.bellIcon}
        />
      </TouchableOpacity>
    );
  };

  const getListProducts = itemProducts => {
    if (!itemProducts) {
      return null;
    }

    let products = itemProducts?.products ?? null;
    let idDepartment = itemProducts._id;
    const numberProducts = itemProducts?.numberProducts ?? 0;

    if (!products || numberProducts === 0) {
      return null;
    }

    return (
      <FlatList
        onEndReachedThreshold={0.1}
        progressViewOffset={true}
        onEndReached={() => lazyLoadDepartment(idDepartment, numberProducts)}
        style={stylesNew.listOffers}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <View style={stylesNew.item}>
              {checkBell(item)}
              <ViewClickItem
                copyright={item.copyright}
                onPress={() => details(item?._id, products)}>
                {item.images && item.images.length > 0 ? (
                  <Image
                    style={styles.productImg}
                    defaultSource={noImage}
                    source={{uri: item.images[0]}}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    style={styles.productImg}
                    source={imageLoad}
                    resizeMode="contain"
                  />
                )}
                <View style={stylesNew.BoxInfo}>
                  <View style={stylesNew.priceContainer}>
                    <Text style={stylesNew.txtValue}>
                      {item.pricePromotion
                        ? formatMoney(item.pricePromotion)
                        : formatMoney(item.price)}
                    </Text>
                    {item.pricePromotion ? (
                      <>
                        <Text style={stylesNew.pricePromotion}>
                          {formatMoney(item.price)}
                        </Text>
                      </>
                    ) : null}
                  </View>

                  {item.pricePromotion ? (
                    <View style={stylesNew.discountContainer}>
                      <Text style={stylesNew.txtDiscount}>
                        {calcDiscount(item.price, item.pricePromotion)}
                      </Text>
                      <Text style={stylesNew.txtPercent}>
                        {calcDiscountPercent(item.price, item.pricePromotion)}
                      </Text>
                    </View>
                  ) : null}

                  <Text style={stylesNew.txtNameProd} numberOfLines={1}>
                    {item?.name}
                  </Text>
                  {/* <Text style={stylesNew.txtNameProd}>
                    {item.description && item.description.length > 20
                      ? `${item.description.substr(0, 15)}...`
                      : item.description}
                  </Text> */}
                </View>
              </ViewClickItem>

              <CartAdd
                item={item}
                company={company}
                openModalValidation={openModalValidation}
              />
            </View>
          );
        }}
        ListFooterComponent={renderFooter(idDepartment)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {listProducts && listProducts.length > 0 ? (
        <FlatList
          progressViewOffset={true}
          style={styles.flatStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          onEndReached={() => refreshListProductsSearch()}
          data={listProducts}
          keyExtractor={item => `${item._id}`}
          renderItem={({item}) => listDepartments(item)}
          ListFooterComponent={renderFooterDepartments()}
        />
      ) : null}
    </View>
  );
};

export default memo(Departments);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  boxDepartment: {
    marginBottom: 25,
  },
  department: {
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.GREY,
    marginLeft: 20,
    marginBottom: 5,
  },
  flatStyle: {
    flexGrow: 1,
  },
  item: {
    alignItems: 'center',
    flexGrow: 1,
    marginHorizontal: 4,
    marginBottom: 0,
    padding: 5,
  },
  productImg: {
    height: 100,
    width: 100,
  },
  priceContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  txtValue: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
    //marginTop: 10,
  },
  pricePromotion: {
    color: Colors.GREY,
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
    marginLeft: 5,
    textDecorationLine: 'line-through',
  },
  discountContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    alignContent: 'center',
    justifyContent: 'center',
  },
  txtDiscount: {
    color: Colors.ALERT,
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  txtPercent: {
    marginLeft: 0,
    backgroundColor: Colors.ALERT_LIGHT,
    borderRadius: 5,
  },
  txtNameProd: {
    width: 100,
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
  flatFooter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginBottom: 100,
  },
  flatIconLoad: {
    marginRight: 20,
    color: Colors.PRIMARY,
  },
});
