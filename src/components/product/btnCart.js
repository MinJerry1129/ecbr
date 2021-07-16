import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { Colors, Typography } from '../../styles';
import { formatMoney } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

export default function BtnCart({
  onPress,
  qtd,
  price,
  loading,
  remainingPrice,
}) {
  const bag = require('./assets/bag.png');

  return (
    <>
      <SafeAreaView>
        {remainingPrice > 0 && qtd > 0 ? (
          <View style={styles.paymentMin}>
            <Text style={styles.txtminInfo}>
              Faltam {formatMoney(remainingPrice)} para o valor mínimo
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.container}
          onPress={() => onPress()}
          activeOpacity={0.8}>
          <LinearGradient
            colors={['#00c0f3', Colors.PRIMARY]}
            style={styles.btnCart}>
            <ImageBackground source={bag} style={styles.imageBagCart}>
              <Text style={styles.itens}>{qtd}</Text>
            </ImageBackground>
            {loading ? (
              <View style={styles.contentLoad}>
                <ActivityIndicator
                  color={remainingPrice <= 0 ? Colors.WHITE : Colors.WHITE}
                  style={styles.activityLoad}
                />
              </View>
            ) : (
                <>
                  <Text style={styles.btnText}>Ver carrinho</Text>
                  <Text style={styles.pricePrimary}>{formatMoney(price)}</Text>
                </>
              )}
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  imageBagCart: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMin: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 5,
    paddingBottom: 8,
    borderTopWidth: 0.7,
    borderLeftWidth: 0.7,
    borderRightWidth: 0.7,
    borderColor: Colors.GREY_LIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  txtminInfo: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.ALERT,
    textAlign: 'center',
  },
  txtMin: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingBottom: 5,
    backgroundColor: Colors.WHITE,
  },
  qtd: {
    flex: 1,
  },
  btnCart: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    letterSpacing: 1,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  price: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    flex: 1,
    textAlign: 'right',
  },
  itens: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginRight: 3,
  },
  pricePrimary: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  contentLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityLoad: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 10,
  },
});
