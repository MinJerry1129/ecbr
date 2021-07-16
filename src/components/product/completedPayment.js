import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, Colors } from '../../styles';

export default function CompletedPayment({ onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronto</Text>
      <TouchableOpacity style={styles.cardTxt} onPress={() => onPress()}>
        <Text style={styles.subTitle}>Acompanhe sua entrega</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },
  cardTxt: {
    marginTop: 20,
    width: '70%',
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: Typography.FONT_SIZE_30,
    color: Colors.PRIMARY,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
});
