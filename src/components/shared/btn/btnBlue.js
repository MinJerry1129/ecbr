import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors, Typography} from '../../../styles';
import {capitalize} from '../../../utils';

const BtnBlue = ({title, onPress, load}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress()}
      disabled={load}>
      {!load && <Text style={styles.title}>{capitalize(title)}</Text>}
      {load && <ActivityIndicator size="small" color={Colors.WHITE} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  title: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
});

export default BtnBlue;
