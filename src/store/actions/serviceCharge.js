import {GET_SERVICE_CHARGE} from './actionTypes';
import listSetting from '../../services/service/settings';

export const getToServiceCharge = (price) => {
  return (dispatch) => {
    let taxa = 0.06;
    listSetting()
      .then((resp) => {
        if (resp && resp.serviceCharge) {
          if (resp.serviceCharge > 0) {
            taxa = resp.serviceCharge / 100;
            let payload = price * taxa;
            dispatch({
              type: GET_SERVICE_CHARGE,
              payload: payload,
            });
          }
        }
      })
      .catch(() => {
        let payload = price * taxa;
        dispatch({
          type: GET_SERVICE_CHARGE,
          payload: payload,
        });
      });
  };
};
