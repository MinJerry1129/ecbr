/* eslint-disable no-shadow */
import axios from 'axios';
import {Alert} from 'react-native';
import {StorageGet, StorageSet} from './deviceStorage';
import config from '../config/index';
import packageJson from '../../package.json';

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json',
    appVersion: packageJson.version,
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  timeout: config.timeout,
});

api.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (
      error.request._hasError === true &&
      error.request._response.includes('connect')
    ) {
      // noNetwork();
      return Promise.reject(error);
    }

    if (
      (error.response &&
        error.response.status &&
        error.response.status !== 401) ||
      error.config.url === '/auth'
    ) {
      return Promise.reject(error);
    }

    // Token Expirou
    if (
      error.config &&
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      const originalRequest = error.config;
      return refreshToken()
        .then(resp => {
          originalRequest.headers.Authorization = `Bearer ${resp.token}`;
          return axios(originalRequest);
        })
        .catch(error => {
          console.log('Refresh Token Error, Redirecionar usuário', error);
          // Enviar Usuário para Tela de login
        });
    }

    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  async config => {
    config.headers.Authorization = await setToken();
    return Promise.resolve(config);
  },
  error => {
    console.log('Falhou ao setar novos parametros no Axios');
    return Promise.reject(error);
  },
);

const setToken = async () => {
  try {
    let user = await StorageGet(config.tokenAuth);
    if (user && user.token) {
      return `Bearer ${user.token}`;
    }

    return '';
  } catch (err) {
    return '';
  }
};

const refreshToken = async () => {
  try {
    console.log('Refresh token chamado ...');
    let storage = await StorageGet(config.tokenAuth);
    let resp = await api.post('/auth/refresh', {refreshToken: storage.refresh});
    storage.token = resp.data.token;
    storage.refresh = resp.data.refresh;
    await StorageSet(config.tokenAuth, storage);
    return resp.data;
  } catch (err) {
    console.log('Falha gerada no refreshToken', err);
    throw err;
  }
};

const noNetwork = () => {
  Alert.alert(
    'Alerta',
    'Não foi possível conectar aos nossos servidores, sem conexão a internet',
    [{text: 'OK'}],
    {cancelable: false},
  );
};

const ErrorAxios = (err, source) => {
  try {
    if (err.response && err.response.data) {
      if (!config.debug) {
        console.log(`${source}`, err.response.data);
      }

      return err.response.data;
    } else {
      if (!config.debug) {
        console.log(`${source}`, err);
      }
      return err;
    }
  } catch (e) {
    return null;
  }
};

const ErrorMessageServer = err => {
  try {
    if (err.response && err.response.data && err.response.data.message) {
      return {
        errMessage: err.response.data.message,
      };
    }

    return {
      errMessage: '',
    };
  } catch (e) {
    return {
      errMessage: 'Opps não foi possível processar informação',
    };
  }
};

export default api;
export {ErrorAxios, ErrorMessageServer};
