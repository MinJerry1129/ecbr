import NetInfo from '@react-native-community/netinfo';
let unsubscribe = null;
/*
Configures the library with the given configuration.
You only need to supply the properties which you want to
change from the default values.

Note that calling this will stop all previously added listeners
from being called again. It is best to call this right when your
application is started to avoid issues.
*/

NetInfo.configure({
  reachabilityUrl: 'https://clients3.google.com/generate_204',
  reachabilityTest: async response => response.status === 204,
  reachabilityLongTimeout: 50 * 1000, // 60s
  reachabilityShortTimeout: 5 * 1000, // 5s
  reachabilityRequestTimeout: 10 * 1000, // 15s
});

const checkSubscribe = () => {
  try {
    unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Tipo Conexão', state.type);
      // console.log('Está Conectado ?', state.isConnected);
      // console.log('Internet acessível com a rede ?', state.isInternetReachable);
    });
  } catch (err) {
    console.warn(err);
  }
};

const checkUnSubscribe = () => {
  try {
    if (unsubscribe !== null) {
      unsubscribe();
    }
  } catch (err) {
    console.log('', err);
  }
};

const isConnected = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isInternetReachable;
  } catch (err) {
    return false;
  }
};

export {checkSubscribe, checkUnSubscribe, isConnected};
