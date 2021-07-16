/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import { Typography, Colors } from '../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertModal from '../../components/shared/modals/AlertModal';
import LocationCurrent from '../../services/location/locationCurrent';
import { isAuthenticated } from '../../services/userAuth';
import { seacrhDeliveryAddress } from '../../services/service/delivery/address';
import { distanceLatLonInKm } from '../../services/maps/distanceCoordinate';
import { StorageSet, StorageGet } from '../../services/deviceStorage';
import moment from 'moment';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cart';

import { toastShow } from '../../utils';

const CartAdd = ({
  item,
  company,
  navigation,
  openModalValidation,
  cartUser,
  onAddToCart,
  addProduct,
  modalCart,
  ProductDetails,
  isConfirmItemClean,
}) => {
  const [product, setProduct] = useState(item);
  const [qtd, setQtd] = useState(0);
  const [modal, setModal] = useState(false);

  let noAgain = false;

  useEffect(() => {
    if (cartUser && cartUser.length > 0) {
      const index = cartUser.findIndex(p => {
        if (p.product && p.product._id && p.product._id === item._id) {
          return true;
        }

        return false;
      });

      if (index >= 0) {
        setQtd(cartUser[index].amount);
      } else {
        setQtd(0);
      }
    } else {
      setQtd(0);
    }
  }, [cartUser]);

  useEffect(() => {
    if (addProduct && !noAgain) {
      incrementItem();
      noAgain = true;
    }

    return () => {
      setModal(false);
    };
  }, []);

  const getCoordinates = async () => {
    const result = await LocationCurrent().getLocation();
    if (result) {
      return result;
    }

    return null;
  };

  const validateCoordinates = async () => {
    const dateValidate = await StorageGet('DateValidadeLocation');

    if (!dateValidate) {
      await StorageSet(
        'DateValidadeLocation',
        moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
          .utc()
          .subtract(3, 'hours'),
      );
    } else {
      await StorageSet(
        'DateValidadeLocation',
        moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
          .utc()
          .subtract(3, 'hours'),
      );

      const dateInit = moment(dateValidate, 'YYYY-MM-DD HH:mm:ss')
        .utc()
        .subtract(3, 'hours');

      const dateFinish = moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
        .utc()
        .subtract(3, 'hours');

      const duration = moment.duration(dateFinish.diff(dateInit));
      const hours = duration.asHours();

      if (hours <= 1) {
        return;
      }
    }

    const coordinatesLocal = await getCoordinates();

    if (coordinatesLocal) {
      let respAddress = await StorageGet('@addressUser');

      if (!respAddress) {
        const response = await isAuthenticated();
        respAddress = await seacrhDeliveryAddress({
          customer: response.user._id,
          main: true,
        });

        if (!respAddress || respAddress.length === 0) {
          navigation.navigate('Customer', {
            screen: 'CustomerAddress',
          });
        }
      }

      const distKm = distanceLatLonInKm(coordinatesLocal, {
        latitude: respAddress.location.coordinates[0],
        longitude: respAddress.location.coordinates[1],
      });

      if (distKm && distKm !== '') {
        let number = distKm.toFixed(2);
        if (number > 1 || (distKm * 1000).toFixed(0) > 100) {
          openModalValidation();
        }
      }
    }
  };

  const incrementItem = async () => {
    await validateCoordinates();
    let itemQtd = qtd + 1;

    if (
      product.maximumAmount &&
      product.maximumAmount > 0 &&
      itemQtd > product.maximumAmount
    ) {
      toastShow(
        `Permitido adicionar até ${product.maximumAmount} itens deste produto`,
        'WARN',
        3000,
      );
      return;
    }

    onAddToCart(company, product, itemQtd);
    setQtd(itemQtd);
  };

  const decrementItem = () => {
    if (qtd === 1 && isConfirmItemClean === true) {
      setModal(true);
    } else {
      let itemQtd = qtd - 1;
      itemQtd = itemQtd < 0 ? 0 : itemQtd;
      onAddToCart(company, product, itemQtd);
      setQtd(itemQtd);
    }
  };

  const confirmRemoveItem = () => {
    setModal(false);
    let itemQtd = qtd - 1;
    itemQtd = itemQtd < 0 ? 0 : itemQtd;
    onAddToCart(company, product, itemQtd);
    setQtd(itemQtd);
  };

  const cardOne = () => {
    return !modalCart ? (
      <View>
        <TouchableOpacity
          style={ProductDetails ? styles.iconAddDetails : styles.iconAdd}
          onPress={() => incrementItem()}>
          <Text style={styles.iconAddText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  };

  const cardTwo = () => {
    return modalCart || ProductDetails ? (
      <View style={styles.listCartQtd}>
        <TouchableOpacity onPress={() => decrementItem()}>
          <Icon name="remove" size={18} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputCartCart}
          value={`${qtd}`}
          editable={false}
        />
        <TouchableOpacity onPress={() => incrementItem()}>
          <Icon name="add" size={18} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
    ) : (
        <View style={styles.listQtd}>
          <TouchableOpacity onPress={() => decrementItem()}>
            <Icon name="remove-circle" size={28} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <TextInput style={styles.inputCart} value={`${qtd}`} editable={false} />
          <TouchableOpacity onPress={() => incrementItem()}>
            <Icon name="add-circle" size={28} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      );
  };

  const selectCart = () => {
    if (qtd > 0) {
      return cardTwo();
    }

    return cardOne();
  };

  return (
    <View>
      {isConfirmItemClean && isConfirmItemClean === true ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}>
          <AlertModal back={setModal} confirm={confirmRemoveItem} />
        </Modal>
      ) : null}
      {selectCart()}
    </View>
  );
};

const mapStateToProps = ({ cart }) => {
  let cartResult = cart.cart ? cart.cart : [];
  return {
    cartUser: cartResult,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToCart: (company, product, qtd) =>
      dispatch(
        addToCart(company, product, qtd, {
          delivery: true,
        }),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(CartAdd));

const styles = StyleSheet.create({
  iconAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.GREY_LIGHT,
    paddingVertical: 10,
  },
  iconAddDetails: {
    elevation: 5,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
  iconAddText: {
    color: Colors.PRIMARY,
    letterSpacing: 1,
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  listCartQtd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    marginBottom: 5,
  },
  listQtd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.GREY_LIGHT,
    paddingVertical: 6,
    marginBottom: 5,
  },
  inputCartCart: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  inputCart: {
    marginTop: 0,
    borderRadius: 7,
    borderColor: Colors.GREY,
    borderWidth: 1,
    marginHorizontal: 3,
    width: 25,
    height: 25,
    padding: 0,
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_14,
    textAlign: 'center',
  },
});
