import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors} from '../../../../styles';

export default function PaymentMethods(typePayments) {
  return (
    <View style={styles.container}>
      {typePayments &&
        typePayments.BRASPAG &&
        typePayments.BRASPAG.length > 0 &&
        typePayments.BRASPAG.map(typePayment => (
          <View>
            <Text>{typePayment.name}</Text>
            <Image source={typePayment.image[0]} />
          </View>
        ))}
      {typePayments &&
        typePayments.MONEY &&
        typePayments.MONEY.length > 0 &&
        typePayments.MONEY.map(typePayment => (
          <View>
            <Text>{typePayment.name}</Text>
            <Image source={typePayment.image[0]} />
          </View>
        ))}
      {typePayments &&
        typePayments.CARD &&
        typePayments.CARD.length > 0 &&
        typePayments.CARD.map(typePayment => (
          <View>
            <Text>{typePayment.name}</Text>
            <Image source={typePayment.image[0]} />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  txtAddress: {
    color: Colors.GREY,
    marginLeft: 5,
  },
});
