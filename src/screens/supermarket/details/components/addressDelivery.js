import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography, Colors } from '../../../../styles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export default function AddressDelivery(address) {
  return (
    <View style={styles.container}>
      <Icon name="place" style={{ color: Colors.PRIMARY }} />
      <Text style={styles.txtAddress} numberOfLines={1}>
        {address}
      </Text>
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
