import moment from 'moment';
import 'moment/locale/pt-br';

const validExpireDate = value => {
  try {
    if (value === undefined || value === null) {
      return false;
    }

    let listArray = value.split('/');

    if (!Array.isArray(listArray) || listArray.length !== 2) {
      return false;
    }

    let month = listArray[0];
    let year = listArray[1];

    if (month < 1 || month > 12) {
      return false;
    }

    let dataCurrent = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').utc();
    let monthCurrent = dataCurrent.format('MM');
    let yearCurrent = dataCurrent.format('YY');

    if (yearCurrent > year || (yearCurrent >= year && monthCurrent >= month)) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};

const validCvv = value => {
  try {
    if (value === undefined || value === null) {
      return false;
    }

    if (value.length < 3) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};

const credicartMessage = (value, send) => {
  if (value === '' && send === false) {
    return true;
  }

  if (value === undefined || value === null) {
    return false;
  }

  let str = value.replace(/\s/g, '');

  if (str.length < 16) {
    return false;
  }

  return true;
};

const expireDateMessage = (value, send) => {
  if (value === '' && send === false) {
    return true;
  }

  return validExpireDate(value);
};

const nameCardMessage = (value, send) => {
  if (value === '' && send === false) {
    return true;
  }

  if (value.length < 10) {
    return false;
  }
};

const cvvMessage = (value, send) => {
  if (value === '' && send === false) {
    return true;
  }

  return validCvv(value);
};

export {
  validExpireDate,
  expireDateMessage,
  credicartMessage,
  validCvv,
  cvvMessage,
  nameCardMessage,
};
