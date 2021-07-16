import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../../../../styles';

import {
  StorageClean,
  StorageGet,
  StorageSet,
} from '../../../../services/deviceStorage';

import {
  listAlertProduct,
  createAlertProduct,
  updateAlertProduct,
} from '../../../../services/service/customer/alertProduct';

const ProductFavorite = ({
  item,
  listAlert,
  customerId,
  showToastAlertProduct,
}) => {
  const [alertProduct, setListAlertProduct] = useState(listAlert);
  const [productLoad, setProductLoad] = useState(null);

  /** Images */
  const imageBellOn = require('../../../../assets/images/alert/sino-on.png');
  const imageBellOff = require('../../../../assets/images/alert/sino-off.png');

  const checkBell = () => {
    let iconOn = false;

    if (alertProduct != null) {
      let index = alertProduct.find(el => el.product === item?._id);
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

        showToastAlertProduct(false);
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

      setProductLoad(null);
      setListAlertProduct(listResp);
      showToastAlertProduct(true);
    } catch (err) {}
  };

  return checkBell();
};

export default React.memo(ProductFavorite);

const styles = StyleSheet.create({
  bellContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
  },
  bellLoad: {
    width: 14,
    height: 18,
    color: Colors.PRIMARY,
  },
  bellIcon: {
    width: 14,
    height: 18,
  },
});
