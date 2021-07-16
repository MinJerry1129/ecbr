/* eslint-disable prettier/prettier */
import {
  ADD_TO_CART,
  ADD_TO_CART_RESTAURANT,
  GET_TO_CART,
  CLEAN_TO_CART,
  LOAD_TO_CART,
  MESSAGE_TO_CART,
} from './actionTypes';
import { listCart } from '../../services/service/shopping/cart';
import {
  updateCartItem,
  createCartItem,
  deleteCartItem,
} from '../../services/service/shopping/cartItem';
import {
  cartCurrent,
  updateCart as updateShoppingCart,
} from '../../services/service/shopping/cart';
import { isAuthenticated } from '../../services/userAuth';
import { createCart } from '../../services/service/shopping/cart';
import {
  StorageGet,
  StorageSet,
  StorageClean,
} from '../../services/deviceStorage';
import { toastShow } from '../../utils';
import { getUser } from '../actions/user';

export const getToCart = (company, params = {}) => {
  return dispatch => {
    StorageClean('cart').then(() => {
      isAuthenticated()
        .then(user => {
          const { user: customer, guest: guest } = user;
          if (customer && customer._id && guest === false) {
            listCart(customer._id, company, { status: 'pending' }).then(result => {
              if (result && result[0] && result[0]._id) {
                StorageSet('cart-atual', result[0]);
                cartCurrent(result[0]._id, params).then(itens => {
                  StorageSet('cart', itens);
                  dispatch(getToCartDispatch(company, itens));

                  // Atualizar a lista de carrinho
                  cartCurrent(result[0]._id, { ...params, updateCard: true }).then(newItens => {
                    StorageSet('cart', newItens);
                    dispatch(getToCartDispatch(company, newItens));
                  });
                });
              } else {
                dispatch(getToCartDispatch(company, { cart: [], status: null }));
                StorageSet('cart', []);
              }
            }).catch(_err => {
              dispatch(getToCartDispatch(company, { cart: [], status: null }));
              StorageSet('cart', []);
            });
          }
        })
        .catch(err => {
          console.log('Fail list user in cart', err);
        });
    });
  };
};

export const getToCartDispatch = (company, payload) => {
  return {
    type: GET_TO_CART,
    payload: payload,
    company: company,
  };
};

export const addToCartRestaurant = (
  company,
  product,
  qtd,
  check,
  radio,
  cartItem,
  comment,
  params,
) => {
  return dispatch => {
    StorageGet('cart').then(itensCart => {
      let cart = itensCart && itensCart.cart ? itensCart.cart : null;
      dispatch(loadToCart(true));
      if (cart && cart.length > 0) {
        if (cartItem && cartItem._id && qtd > 0) {
          // Atualizar informações
          // console.log('Atualizando Item ....');
          updateCartItem(cartItem.cartId, cartItem.cartItemId, {
            amount: qtd,
            price: product.price,
            check,
            radio,
            comment,
          }).then(() => {
            cartCurrent(cartItem.cartId, params).then(itens => {
              StorageSet('cart', itens).then(() => dispatch(listToCart(itens)));
              dispatch(loadToCart(false));
            });
          }).catch(_err => { });
          return;
        }

        let cartId = cart[0].cartId;
        createCartItem(cartId, product._id, {
          amount: qtd,
          price: product.price,
          pricePromotion: product.pricePromotion,
          check,
          radio,
          type: company.type,
          comment,
        })
          .then(_result => {
            cartCurrent(cartId, params).then(itens => {
              StorageSet('cart', itens).then(() => dispatch(listToCart(itens)));
              dispatch(loadToCart(false));
            });
          })
          .catch(() => {
            dispatch(loadToCart(false));
          });
      } else {
        // Não Existe Carrinho ou Sem Produto no carrinho
        isAuthenticated().then(user => {
          const { user: customer, guest: guest } = user;
          if (guest && guest === true) {
            toastShow('É preciso estar logado', 'WARN');
            StorageClean('CUSTOMER').then(() => {
              dispatch(getUser());
            });
            return;
          }

          if (customer && customer._id) {
            createCart(customer._id, company._id, {}).then(resultCart => {
              if (resultCart && resultCart.error) {
                dispatch(loadToCart(false));
                dispatch(messageErrorToCart(resultCart.error));
                return;
              }

              if (resultCart && resultCart._id) {
                createCartItem(resultCart._id, product._id, {
                  amount: qtd,
                  price: product.price,
                  pricePromotion: product.pricePromotion,
                  check,
                  radio,
                  type: company.type,
                  comment,
                }).then(_itemResult => {
                  cartCurrent(resultCart._id, params).then(itens => {
                    StorageSet('cart', itens).then(() =>
                      dispatch(listToCart(itens)),
                    );
                    dispatch(loadToCart(false));
                  }).catch(_err => { });
                }).catch(_err => { });
              } else {
                // sem produto no carrinho
                listCart(customer._id, company._id, { status: 'pending' }).then(
                  result => {
                    if (result && result[0]) {
                      createCartItem(result[0]._id, product._id, {
                        amount: qtd,
                        price: product.price,
                        pricePromotion: product.pricePromotion,
                        check,
                        radio,
                        type: company.type,
                        comment,
                      }).then(_itemResult => {
                        cartCurrent(result[0]._id, params).then(itens => {
                          StorageSet('cart', itens).then(() =>
                            dispatch(listToCart(itens)),
                          );
                          dispatch(loadToCart(false));
                        });
                      }).catch(_err => { });
                    }
                  },
                ).catch(_err => { });
              }
            }).catch(_err => { });
          }
        });
      }
    });
  };
};

export const removeCartRestaurant = (cartItem, params) => {
  return dispatch => {
    dispatch(loadToCart(true));
    deleteCartItem(cartItem.cartId, cartItem.cartItemId).then(() => {
      cartCurrent(cartItem.cartId, params).then(itens => {
        StorageSet('cart', itens).then(() => dispatch(listToCart(itens)));
        dispatch(loadToCart(false));
      });
    });
  };
};

export const addToCart = (company, product, qtd, params) => {
  return dispatch => {
    StorageGet('cart').then(itensCart => {
      let cart = itensCart && itensCart.cart ? itensCart.cart : null;
      dispatch(loadToCart(true));
      if (cart && cart.length > 0) {
        const index = cart.findIndex(p => p.product._id === product._id);
        if (index >= 0) {
          // Produto no Carrinho Já Existe
          if (qtd <= 0) {
            deleteCartItem(cart[index].cartId, cart[index].cartItemId).then(
              () => {
                cartCurrent(cart[index].cartId, params).then(itens => {
                  StorageSet('cart', itens).then(() =>
                    dispatch(listToCart(itens)),
                  );
                  dispatch(loadToCart(false));
                });
              },
            ).catch(_err => { });
          } else {
            updateCartItem(cart[index].cartId, cart[index].cartItemId, {
              amount: qtd,
              price: product.price,
              pricePromotion: product.pricePromotion,
            }).then(_resultUp => {
              cartCurrent(cart[index].cartId, params).then(itens => {
                StorageSet('cart', itens).then(() =>
                  dispatch(listToCart(itens)),
                );
                dispatch(loadToCart(false));
              });
            }).catch(_err => { });
          }
        } else if (cart && cart[0]) {
          // Existe Carrinho - Sem Produto
          createCartItem(cart[0].cartId, product._id, {
            amount: qtd,
            price: product.price,
            pricePromotion: product.pricePromotion,
            type: company.type,
          }).then(_itemResult => {
            cartCurrent(cart[0].cartId, params).then(itens => {
              StorageSet('cart', itens).then(() => dispatch(listToCart(itens)));
              dispatch(loadToCart(false));
            });
          }).catch(_err => { });
        }
      } else {
        // Não Existe Carrinho ou Sem Produto no carrinho
        isAuthenticated().then(user => {
          const { user: customer, guest: guest } = user;
          if (guest && guest === true) {
            toastShow('É preciso estar logado', 'WARN');
            StorageClean('CUSTOMER').then(() => {
              dispatch(getUser());
            });
            return;
          }

          if (customer && customer._id) {
            createCart(customer._id, company._id, {}).then(resultCart => {
              if (resultCart && resultCart.error) {
                dispatch(loadToCart(false));
                dispatch(messageErrorToCart(resultCart.error));
                dispatch(getToCart(company._id));
                if (resultCart.error ===
                  'Já existe uma compra em andamento para esse cliente neste estabelecimento!') {
                  toastShow(resultCart.error, 'WARN');
                }
                return;
              }

              if (resultCart && resultCart._id) {
                createCartItem(resultCart._id, product._id, {
                  amount: qtd,
                  price: product.price,
                  pricePromotion: product.pricePromotion,
                  type: company.type,
                }).then(_itemResult => {
                  cartCurrent(resultCart._id, params).then(itens => {
                    StorageSet('cart', itens).then(() =>
                      dispatch(listToCart(itens)),
                    );
                    dispatch(loadToCart(false));
                  });
                }).catch(_err => { });
              } else {
                // sem produto no carrinho
                listCart(customer._id, company._id, { status: 'pending' }).then(
                  result => {
                    if (result && result[0]) {
                      createCartItem(result[0]._id, product._id, {
                        amount: qtd,
                        price: product.price,
                        pricePromotion: product.pricePromotion,
                        type: company.type,
                      }).then(_itemResult => {
                        cartCurrent(result[0]._id, params).then(itens => {
                          StorageSet('cart', itens).then(() =>
                            dispatch(listToCart(itens)),
                          );
                          dispatch(loadToCart(false));
                        });
                      }).catch(_err => { });
                    }
                  },
                ).catch(_err => { });
              }
            }).catch(_err => { });
          }
        });
      }
    });
  };
};

export const cleanToCart = () => {
  return dispatch => {
    StorageGet('cart').then(cart => {
      if (cart && cart.cart && cart.cart.length) {
        updateShoppingCart(cart.cart[0].cartId, {
          status: 'deleted',
          isDeleted: true,
        })
          .then(_resp => {
            StorageClean('cart').then(() => dispatch({ type: CLEAN_TO_CART }));
          })
          .catch(_err => dispatch({ type: CLEAN_TO_CART }));
      }
    });
  };
};

export const listToCart = payload => {
  return {
    type: ADD_TO_CART,
    payload: payload,
  };
};

export const listToCartRestaurant = payload => {
  return {
    type: ADD_TO_CART_RESTAURANT,
    payload: payload,
  };
};

export const loadToCart = payload => {
  return {
    type: LOAD_TO_CART,
    payload: payload,
  };
};

export const messageErrorToCart = payload => {
  return {
    type: MESSAGE_TO_CART,
    payload: {
      random: Math.random(),
      message: payload,
    },
  };
};
