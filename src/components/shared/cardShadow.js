/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../styles';

const CardShadow = props => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {props.children}
      </View>
    </View>
  );
};

export default CardShadow;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    shadowColor: Colors.GREY,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 3,
    //marginHorizontal: 20,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    //padding: 5,
  },
});
