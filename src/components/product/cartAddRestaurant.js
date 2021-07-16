/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {Typography, Colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';
import {addToCartRestaurant} from '../../store/actions/cart';
import {increment, decrement} from '../../utils/screens/productRestaurantUtils';

const CartAddRestaurant = ({
  item,
  company,
  cartUser,
  onAddToCart,
  check,
  radio,
  required,
  setMinMax,
  comment,
}) => {
  const [product, setProduct] = useState(item);
  const [qtd, setQtd] = useState(0);
  const [getMax, setGetMax] = useState(0);
  const [getMin, setGetMin] = useState(0);
  var max = 0;
  var min = 0;

  useEffect(() => {
    if (cartUser) {
      const index = cartUser.findIndex(p => p.product._id === product._id);
      if (index >= 0) {
        setQtd(cartUser[index].amount);
      } else {
        setQtd(0);
      }
    }
    if (setMinMax) {
      setMinMax.map(mm => {
        max = max + mm.max;
        min = min + mm.min;
        setGetMax(max);
        setGetMin(min);
      });
    }
  }, [cartUser]);

  const incrementItem = () => {
    const respIncrement = increment(check, radio, required, getMax, setMinMax);
    if (
      respIncrement &&
      respIncrement.status &&
      respIncrement.status === true
    ) {
      let itemQtd = qtd + 1;
      onAddToCart(company, product, itemQtd, check, radio);
      setQtd(itemQtd);
      return;
    }

    if (
      respIncrement &&
      respIncrement.status &&
      respIncrement.status === false
    ) {
      Alert.alert(respIncrement.title, respIncrement.message);
    }
  };

  const decrementItem = () => {
    const respDecrement = decrement(qtd);
    if (respDecrement && decrement.status === false) {
      Alert.alert(respDecrement.title, respDecrement.message);
      return;
    }

    let itemQtd = respDecrement.payload;
    onAddToCart(company, product, itemQtd, check, radio);
    setQtd(itemQtd);
  };

  const cardOne = () => {
    return (
      <TouchableOpacity style={styles.iconAdd} onPress={() => incrementItem()}>
        <Icon name="add-circle" size={35} color={Colors.PRIMARY} />
      </TouchableOpacity>
    );
  };

  const cardTwo = () => {
    return (
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

  return selectCart();
};

const mapStateToProps = ({cart}) => {
  let cartResult = cart.cart ? cart.cart : [];
  return {
    cartUser: cartResult,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToCart: (company, product, qtd, check, radio, comment) =>
      dispatch(
        addToCartRestaurant(company, product, qtd, check, radio, comment, {
          type: 'restaurant',
        }),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartAddRestaurant);

const styles = StyleSheet.create({
  iconAdd: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listQtd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
