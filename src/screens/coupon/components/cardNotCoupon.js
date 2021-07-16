/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Typography } from '../../../styles';

const CardNotCoupon = ({ company, params, navigation, notCoupon }) => {
  if (!notCoupon) {
    return null;
  }

  const goBack = () => {
    if (company) {
      navigation.navigate(params[0], {
        screen: params[1],
        params: {
          company: company,
          openCart: true,
        },
      });
    } else {
      navigation.navigate('Home', { screen: 'Home' });
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => goBack()}>
        <View style={styles.contantAmount}>
          <View style={styles.contentIcon}>
            <Icon
              name="confirmation-number"
              size={40}
              color={Colors.DARK_LIGHT}
            />
          </View>
          <Text style={styles.txtAmount}>Sem cupom</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardNotCoupon;

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  contantAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentIcon: {},

  txtAmount: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    fontWeight: '700',
    color: Colors.DARK_LIGHT,
    marginLeft: 10,
  },
});
