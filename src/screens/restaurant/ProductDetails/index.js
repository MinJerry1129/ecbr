/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Badge } from 'react-native-elements';
import {
  totalItem,
  checkItens,
} from '../../../utils/screens/productRestaurantUtils';
import CartItemProduct from '../ProductDetails/cartItemProduct';
import { Colors } from '../../../styles';
import Cart from '../cart';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import styles from './styles';
import { listOne, listComplement } from '../../../services/service/Food';
import { getToCart } from '../../../store/actions/cart';
import { addToCartRestaurant } from '../../../store/actions/cart';
import { formatMoney } from '../../../utils';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import LootieView from 'lottie-react-native';
import loaderLootie from '../../../assets/animations/loader.json';

const ProductDetails = ({ navigation, route, onAddToCart, onGetToCart }) => {
  const [product, setProduct] = useState([]);
  const [complement, setComplement] = useState([]);
  const [load, setLoad] = useState(true);
  const [company, setCompany] = useState(null);
  const [modalCart, setModalCart] = useState(false);
  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItem, setCartItem] = useState(cartItem);
  const [totalAdd, setTotalAdd] = useState(1);
  const [comment, setComment] = useState('');
  const inputComment = useRef(null);
  const scrollView = useRef(null);
  const idProduct = route.params?.idProduct ?? null;
  let setIsRequired = [];
  let setMinMax = [];

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
          // console.log('paramns', paramsItem);
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
    navigation.navigate('RestaurantProduct', {
      company: company,
    });
  };

  const goBack = () => {
    navigation.navigate('RestaurantProduct', {
      company,
    });
  };

  const seRadio = (id, groupId, priceRadio) => {
    let index = radio.findIndex(e => e.group === groupId);
    let tmpRadio = [];

    if (index > -1) {
      if (radio[index].id === id) {
        tmpRadio = [...radio];
        tmpRadio.splice(index, 1);
        setRadio([...tmpRadio]);
      } else if (radio[index].id !== id) {
        tmpRadio = [...radio];
        tmpRadio.splice(index, 1);
        tmpRadio = [...tmpRadio, { group: groupId, id, price: priceRadio }];
        setRadio(tmpRadio);
      } else {
        tmpRadio = [...radio, { group: groupId, id, price: priceRadio }];
        setRadio(tmpRadio);
      }
    } else {
      tmpRadio = [...radio, { group: groupId, id, price: priceRadio }];
      setRadio(tmpRadio);
    }
  };

  const showRadio = (id, groupId) => {
    let index = radio.findIndex(e => e.group === groupId);

    if (index > -1) {
      if (radio[index].id === id) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  };

  const setCheckbox = (id, groupId, priceCheck, qty) => {
    let existCheck = check.find(e => e.id === id);
    let tmpCheck = [];

    if (!existCheck) {
      let itemQtd = check.reduce((_itemQtd, itemCheck) => {
        if (itemCheck.group === groupId) {
          _itemQtd++;
        }

        return _itemQtd;
      }, 0);

      if (itemQtd >= qty) {
        Alert.alert(
          'Máximo permitido!!',
          `Você ultrapassou o máximo de opções permitidas que é ${qty}`,
        );
        return;
      }

      tmpCheck = [...check, { group: groupId, id, price: priceCheck }];
      setCheck(tmpCheck);
    } else {
      let index = check.findIndex((c, indexResult) => {
        if (c.id === id) {
          return indexResult;
        }
      });
      if (index < 0) {
        index = 0;
      }
      tmpCheck = [...check];
      tmpCheck.splice(index, 1);
      setCheck(tmpCheck);
    }
  };

  const showCheck = id => {
    var existCheck = check.find(e => e.id === id);
    return existCheck ? true : false;
  };

  const setRequired = id => {
    setIsRequired.push(id);
  };

  const getMinMax = (groupId, min, max) => {
    setMinMax.push({ group: groupId, min, max });
  };

  const addCartItem = qtd => {
    if (qtd > 0) {
      setTotalAdd(qtd);
    }
  };

  const infoQtd = (min, max) => {
    if (min === max) {
      return `(Escolha. ${max})`;
    } else if (min > 0 && min !== max) {
      return `(Min. ${min} - Max. ${max})`;
    }

    return `(Max. ${max})`;
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
                <Text numberOfLines={10} style={styles.txtprice}>
                  {product.description && product.description.length > 0
                    ? `${product.description}`
                    : '-'}
                </Text>
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
          {complement.map(comp => {
            return (
              <View key={comp.complement._id} style={styles.boxOptions}>
                <LinearGradient
                  colors={['#1880d0', '#1880d0', '#00c0f3']}
                  style={styles.boxTitle}>
                  <View style={styles.boxMax}>
                    <Text style={styles.titleOption}>
                      {comp.complement.name}
                    </Text>
                    {comp.complement.isRequired ? (
                      <Text style={styles.titleMax}>
                        {infoQtd(
                          comp.complement.amountMin,
                          comp.complement.amountMax,
                        )}
                      </Text>
                    ) : null}

                    {!comp.complement.isRequired &&
                      comp.complement &&
                      comp.complement.amountMax ? (
                        <Text style={styles.titleMax}>
                          {infoQtd(
                            comp.complement.amountMin,
                            comp.complement.amountMax,
                          )}
                        </Text>
                      ) : null}
                  </View>
                  {getMinMax(
                    comp.complement._id,
                    comp.complement.amountMin,
                    comp.complement.amountMax,
                  )}
                  {comp.complement.isRequired ? (
                    <>
                      {setRequired(comp.complement._id)}
                      <Badge
                        status="warning"
                        value="Campo Obrigatório"
                        badgeStyle={styles.badge}
                      />
                    </>
                  ) : null}
                </LinearGradient>
                <View style={styles.boxComplements}>
                  {comp.products.map(item => (
                    <TouchableOpacity
                      key={item._id}
                      style={styles.complementItem}
                      onPress={() =>
                        comp.complement.amountMax === 1
                          ? seRadio(item._id, comp.complement._id, item.price)
                          : setCheckbox(
                            item._id,
                            comp.complement._id,
                            item.price,
                            comp.complement.amountMax,
                          )
                      }>
                      <View style={styles.BoxTitleOption}>
                        <Text numberOfLines={5} style={styles.TitleOption}>
                          {item.name && item.name.length > 0
                            ? `${item.name}`
                            : ''}
                        </Text>
                        {item.description ? (
                          <Text numberOfLines={5} style={styles.SubTitleOption}>
                            {item.description && item.description.length > 0
                              ? `${item.description}`
                              : '-'}
                          </Text>
                        ) : null}
                      </View>
                      <View style={styles.boxRadio}>
                        <Text style={styles.plusPricce}>
                          + {formatMoney(item.price)}
                        </Text>
                        {comp.complement.amountMax === 1 ? (
                          showRadio(item._id, comp.complement._id) ? (
                            <View style={styles.radio}>
                              <View style={styles.radioSelect}>
                                {/* <Text style={styles.radioSelect} /> */}
                              </View>
                            </View>
                          ) : (
                              <Text style={styles.radio} />
                            )
                        ) : showCheck(item._id) ? (
                          <View style={styles.checkbox}>
                            <View style={styles.checkSelect}>
                              {/* <Text style={styles.checkSelect} /> */}
                            </View>
                          </View>
                        ) : (
                              <Text style={styles.checkbox} />
                            )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}
          <View style={styles.viewComment}>
            <View style={styles.comment}>
              <View>
                <Text style={styles.titleComment}>
                  {<Icon name="comment" size={20} style={styles.iconComment} />}
                  {'  '}
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
                placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne etc"
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
          type: 'restaurant',
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
            type: 'restaurant',
          },
        ),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetails);
