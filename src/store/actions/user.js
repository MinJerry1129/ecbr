import {GET_USER, GET_ADDRESS} from './actionTypes';
import {StorageGet, StorageSet} from '../../services/deviceStorage';
import {isAuthenticated} from '../../services/userAuth';
import {seacrhDeliveryAddress} from '../../services/service/delivery/address';
const keyNme = 'CUSTOMER';

export const getUser = () => {
  return dispatch => {
    StorageGet(keyNme)
      .then(resp => {
        dispatch(userAction(resp));
      })
      .catch(err => console.log(err));
  };
};

export const setUser = user => {
  return dispatch => {
    StorageSet(keyNme, user)
      .then(() => {
        dispatch(getUser());
      })
      .catch(err => console.log(err));
  };
};

export const getAddress = () => {
  return dispatch => {
    isAuthenticated()
      .then(resp => {
        if (resp) {
          const idCustomer = resp.user._id;
          seacrhDeliveryAddress({
            customer: idCustomer,
            main: true,
          })
            .then(respAddres => {
              if (respAddres && respAddres.length > 0) {
                StorageSet('@addressUser', respAddres[0]);
                dispatch({
                  type: GET_ADDRESS,
                  user: resp.user,
                  payload: respAddres,
                });
              }
            })
            .catch(err => {
              console.log('Errro user getAddress', err);
            });
        }
      })
      .catch(err => {
        console.log('Errro user getAddress', err);
      });
  };
};

export const userAction = user => {
  return {
    type: GET_USER,
    payload: user,
  };
};
