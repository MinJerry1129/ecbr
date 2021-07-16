import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../../styles';

export default function CardView({ onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => onPress}>
      <Text style={styles.txt}>Filtros</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#1B7FD0',
    borderRadius: 10,
    marginRight: 10,
  },
  txt: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
});
