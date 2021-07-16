import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {Colors} from '../../../../../styles';

const ChatImageLoad = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    </View>
  );
};

export default ChatImageLoad;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    height: 150,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  imageContainer: {
    width: '70%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: Colors.SECONDARY_LIGHT,
  },
});
