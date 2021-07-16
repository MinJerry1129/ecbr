/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import LootieView from 'lottie-react-native';
import { TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import Cart from '../cart';
import styles from './styles';
import { Colors } from '../../../styles';
import { formatMoney } from '../../../utils';
import {
  totalItem,
  checkItens,
} from '../../../utils/screens/productRestaurantUtils';
import ModalDescription from './components/ModalDescription';
import CartItemProduct from '../ProductDetails/cartItemProduct';
import loaderLootie from '../../../assets/animations/loader.json';
import { addToCartRestaurant, getToCart } from '../../../store/actions/cart';
import { listOne, listComplement } from '../../../services/service/accessories';

const ProductDetails = ({ navigation, route, onAddToCart, onGetToCart }) => {
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(true);
  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);
  const [product, setProduct] = useState([]);
  const [comment, setComment] = useState('');
  const [totalAdd, setTotalAdd] = useState(1);
  const [company, setCompany] = useState(null);
  const [complement, setComplement] = useState([]);
  const [modalCart, setModalCart] = useState(false);
  const [cartItem, setCartItem] = useState(cartItem);
  const [modalDescription, setModalDescription] = useState(false);

  const scrollView = useRef(null);
  const inputComment = useRef(null);
  const idProduct = route.params?.idProduct ?? null;
  let setIsRequired = [];

  useFocusEffect(
    useCallback(() => {
      const companyParam = route.params?.company ?? null;
      setCompany(companyParam);
      onGetToCart(companyParam?._id);

      const runProduct = async () => {
        setLoad(true);
        const result = await listOne(idProduct);
        const resultComplement = await listComplement(idProduct);
        setLoad(false);

        if (result) {
          setProduct(result);
        }
        if (resultComplement) {
          setComplement(resultComplement);
        }
      };
      runProduct();
    }, [idProduct]),
  );

  useFocusEffect(
    useCallback(() => {
      setTotal(totalItem(totalAdd, product, check, radio));
    }, [totalAdd, check, radio, product]),
  );

  useFocusEffect(
    useCallback(() => {
      if (route.params && route.params.cartItem) {
        const paramsItem = route.params?.cartItem ?? null;
        if (paramsItem) {
          setCartItem(paramsItem);

          if (paramsItem.radio) {
            setRadio(paramsItem.radio);
          }

          if (paramsItem.check) {
            setCheck(paramsItem.check);
          }

          if (paramsItem.amount) {
            setTotalAdd(paramsItem.amount);
          }

          if (paramsItem.comment) {
            setComment(paramsItem.comment);
          }
        }
      }
    }, [route.params]),
  );

  const cartScreen = qtd => {
    onAddToCart(company, product, qtd, check, radio, cartItem, comment);
    closeModal();
  };

  const closeModal = () => {
    setModalCart(false);
    navigation.navigate('AccessoriesProduct', {
      company: company,
    });
  };

  const goBack = () => {
    navigation.navigate('AccessoriesProduct', {
      company,
    });
  };

  const addCartItem = qtd => {
    if (qtd > 0) {
      setTotalAdd(qtd);
    }
  };

  const onChangeComment = text => {
    if (text.length > 140) {
      return;
    }
    setComment(text);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidHide = () => {
    if (!inputComment) {
      return;
    }

    if (inputComment.current.isFocused()) {
      scrollView.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalCart}
          onRequestClose={() => setModalCart(false)}>
          <Cart
            close={closeModal}
            navigation={navigation}
            companyParam={company}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalDescription}
          onRequestClose={() => setModalDescription(false)}>
          <ModalDescription goBack={setModalDescription} product={product} />
        </Modal>

        <TouchableOpacity style={styles.header} onPress={() => goBack()}>
          <Icon
            name="keyboard-arrow-down"
            size={50}
            style={styles.iconBefore}
          />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scroll} ref={scrollView}>
          {load === false && product.images ? (
            <View style={styles.imageContent}>
              <Image
                style={styles.productImage}
                source={{
                  uri: product.images[0],
                }}
                resizeMode="contain"
              />
            </View>
          ) : (
              <View style={styles.loading}>
                <LootieView
                  source={loaderLootie}
                  style={{ height: 60 }}
                  resizeMode="contain"
                  loop
                  autoPlay
                />
              </View>
            )}

          <View style={styles.descriptContent}>
            <View style={styles.cardQtd}>
              <View style={styles.boxPrice}>
                <Text numberOfLines={2} style={styles.titleProduct}>
                  {product.name}
                </Text>
                <Text numberOfLines={2} style={styles.txtprice}>
                  {product.shortDescription &&
                    product.shortDescription.length > 0
                    ? `${product.shortDescription}`
                    : '-'}
                </Text>
                {product.description && product.description.length > 0 && (
                  <TouchableOpacity
                    style={styles.touchShowMore}
                    onPress={() => setModalDescription(true)}>
                    <Text style={styles.showMore}>Mostrar mais...</Text>
                  </TouchableOpacity>
                )}
                <View style={styles.priceContainer}>
                  {product.pricePromotion ? (
                    <>
                      <Text style={styles.pricePromotion}>
                        {formatMoney(product.pricePromotion)}
                      </Text>
                      <Text style={styles.txtValue}>
                        {formatMoney(product.price)}
                      </Text>
                    </>
                  ) : (
                      <Text style={styles.pricePromotion}>
                        {formatMoney(product.price)}
                      </Text>
                    )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.viewComment}>
            <View style={styles.comment}>
              <View>
                <Text style={styles.titleComment}>
                  <Icon name="comment" size={20} style={styles.iconComment} />
                  Alguma observação?
                </Text>
              </View>
              <Text style={styles.qtdComment}>{comment.length}/140</Text>
            </View>

            <View style={styles.textAreaContainer}>
              <TextInput
                ref={inputComment}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Digite aqui..."
                placeholderTextColor={Colors.DARK}
                numberOfLines={5}
                multiline={true}
                onChangeText={text => onChangeComment(text)}
                value={comment}
                onPress={Keyboard.dismiss}
                returnKeyType="next"
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <CartItemProduct
            qtd={totalAdd}
            add={addCartItem}
            remove={addCartItem}
            total={total}
            onPress={cartScreen}
            addOK={checkItens(check, radio, setIsRequired, complement)}
            disposed={!load}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({ cart }) => {
  let cartResult = cart.cart ? cart.cart : [];
  return {
    qtdProd: cartResult.length,
    price: cart.subTotal,
    //messageError: cart?.messageError ?? null,
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
    onAddToCart: (company, product, qtd, check, radio, cartItem, comment) =>
      dispatch(
        addToCartRestaurant(
          company,
          product,
          qtd,
          check,
          radio,
          cartItem,
          comment,
          {
            type: 'accessories',
          },
        ),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetails);
