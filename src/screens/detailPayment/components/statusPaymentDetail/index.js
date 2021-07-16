import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Colors, Typography} from '../../../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StatusPaymentDetail = ({
  navigation,
  status,
  statusMessage,
  setModalStatus,
  typePayment,
}) => {
  const sizeIndicator = 180;
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(statusMessage);
    return () => {};
  }, [statusMessage]);

  const myOrder = () => {
    navigation.navigate('Supermarket', {
      screen: 'Supermarket',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.indicatorContainer}>
        {status === 1 && (
          <>
            <Text style={styles.txtIndicator}>{message}</Text>
            <ActivityIndicator size={sizeIndicator} color={Colors.WHITE} />
          </>
        )}

        {status === 2 ? (
          <View style={styles.checkIcon}>
            <Icon
              name="check-circle"
              size={sizeIndicator}
              color={Colors.WHITE}
            />
          </View>
        ) : null}

        {status === 3 || status === 10 || status === 11 || status === 13 ? (
          <View style={styles.boxNewPage}>
            <View>
              <Text style={styles.boxNewPageText}>
                {typePayment === 'FINANCE'
                  ? 'Não conseguimos comunicação com a operadora do seu Cartão'
                  : 'Não conseguimos criar o seu pedido.'}
              </Text>
              <Text style={styles.boxNewPageText}>
                {typePayment === 'FINANCE'
                  ? 'Revise os dados do cartão e tente novamente'
                  : 'Revise os seus dados e tente novamente.'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalStatus(false)}
              style={styles.boxNewPageBtn}>
              <Text style={styles.boxNewPageBtnText}>Revisar dados</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {status === 12 || status === 0 || status === 20 ? (
          <View style={styles.checkIcon}>
            <Icon name="error" size={sizeIndicator} color={Colors.WARNING} />
            <TouchableOpacity onPress={() => myOrder()}>
              <Text style={styles.txtInfoBack}>Meus Pedidos</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {status === 'error' && message ? (
          <View style={styles.boxNewPage}>
            <View>
              <Text style={styles.boxNewPageText}>{message}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalStatus(false)}
              style={styles.boxNewPageBtn}>
              <Text style={styles.boxNewPageBtnText}>Revisar dados</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {status === null && message && message.length > 0 ? (
          <View style={styles.boxNewPage}>
            <View>
              <Text style={styles.txtTypePayment}>
                Método de pagamento
                {typePayment === null ? ' EconomizeBR' : ''}
                {typePayment === 'CARD' ? ' Cartão' : ''}
                {typePayment === 'MONEY' ? ' Dinheiro' : ''}
              </Text>
              <Text style={styles.txtIndicator}>{message}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalStatus(false)}
              style={styles.boxNewPageBtn}>
              <Text style={styles.boxNewPageBtnText}>Revisar dados 3</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default StatusPaymentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  header: {
    flex: 1,
  },
  indicatorContainer: {
    flex: 2,
  },
  txtIndicator: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.WHITE,
    marginHorizontal: 20,
    marginTop: 25,
  },
  addressContent: {
    flex: 1,
    justifyContent: 'center',
  },
  address: {
    flexDirection: 'row',
    margin: 10,
    borderTopWidth: 0.7,
    borderColor: Colors.WHITE,
    borderStyle: 'solid',
    paddingTop: 10,
  },
  iconContainer: {},
  delivery: {
    flex: 1,
    marginLeft: 10,
  },
  txtInfo: {
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.WHITE,
  },
  txtDelivery: {
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  checkIcon: {
    alignItems: 'center',
  },
  txtErrorBack: {
    fontSize: Typography.FONT_SIZE_18,
    fontWeight: '700',
    color: Colors.WARNING,
    textDecorationLine: 'underline',
  },
  txtInfoBack: {
    fontSize: Typography.FONT_SIZE_18,
    fontWeight: '700',
    color: Colors.WHITE,
    textDecorationLine: 'underline',
  },
  boxNewPage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  boxNewPageText: {
    color: Colors.WHITE,
    marginBottom: 20,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_22,
  },
  boxNewPageBtn: {
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
  },
  boxNewPageBtnText: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
  },
  txtTypePayment: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    marginHorizontal: 20,
    marginTop: 25,
  },
});
