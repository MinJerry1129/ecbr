import moment from 'moment';
import 'moment/locale/pt-br';
import Toast from 'react-native-tiny-toast';
import { Colors } from '../styles';

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const queryString = params => {
  try {
    let getQuery = '';
    if (params && params !== undefined) {
      getQuery = Object.keys(params)
        .map(function (key) {
          return key + '=' + params[key];
        })
        .join('&');
    }

    return getQuery;
  } catch (err) {
    return '';
  }
};

const formatterAmount = amount => {
  try {
    const number = amount.toFixed(2);
    if (number >= 0) {
      return number.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    return '';
  } catch (err) {
    //console.log('Error format Amount', err);
    return amount;
  }
};

const formatMoney = (amount, isSymbol = true) => {
  try {
    let money = formatterAmount(amount);
    money = money.replace('.', ',');
    return isSymbol ? `R$ ${money}` : money;
  } catch (err) {
    return '';
  }
};

const capitalize = s => {
  if (typeof s !== 'string') {
    return s;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const formatDate = (date, format) => {
  try {
    let dateF = moment(date, 'YYYY-MM-DD hh:mm:ss')
      .subtract(3, 'hours')
      .locale('pt-br')
      .format(format);

    if (dateF === 'Invalid date' || dateF === undefined) {
      return '';
    }

    return dateF;
  } catch (err) {
    return '';
  }
};

const hoursBase10 = hour => {
  try {
    let str = `${hour}`;
    let size = str.length;
    if (size === 3) {
      return '0' + str.substr(0, 1) + ':' + str.substr(1, size);
    }

    return str.substr(0, 2) + ':' + str.substr(2, size);
  } catch (err) {
    console.log('Error', err);
    return '';
  }
};

const chunkSubstr = (str, size) => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }
  return chunks;
};

const toastShow = (msg, type = 'DEFAULT', duration = 8000) => {
  let background = Colors.PRIMARY;
  switch (type) {
    case 'DEFAULT':
      background = Colors.PRIMARY;
      break;
    case 'ALERT':
      background = Colors.ALERT;
      break;
    case 'WARN':
      background = Colors.SECONDARY;
      break;
    default:
      background = Colors.PRIMARY;
  }

  Toast.show(msg, {
    position: Toast.position.TOP,
    containerStyle: {
      zIndex: 100,
      position: 'absolute',
      marginHorizontal: 20,
      top: 10,
      backgroundColor: background,
      borderRadius: 15,
    },
    textStyle: { color: Colors.WHITE },
    mask: false,
    maskStyle: {},
    duration: duration,
    animation: true,
  });
};

const replaceSpecialChars = str => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/([^\w]+|\s+)/g, '') // Substitui espaço e outros caracteres por hífen
    .replace(/\-\-+/g, '') // Substitui multiplos hífens por um único hífen
    .replace(/(^-+|-+$)/, ''); // Remove hífens extras do final ou do inicio da string
};

const formatDateFromNow = date => {
  try {
    let dataCurrent = moment(date);
    let dateFormat = dataCurrent.locale('pt-br').fromNow();
    return dateFormat;
  } catch (err) {
    return '';
  }
};

const formatPhone = number => {
  let cleaned = ('' + number).replace(/\D/g, '');

  if (!cleaned) {
    return number;
  }

  let match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);

  if (!match) {
    return cleaned;
  } else {
    return match[1] + ' ' + match[2] + '.' + match[3];
  }
};

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export {
  validateEmail,
  queryString,
  capitalize,
  formatterAmount,
  formatDate,
  hoursBase10,
  chunkSubstr,
  toastShow,
  formatMoney,
  replaceSpecialChars,
  formatDateFromNow,
  formatPhone,
  round,
};
