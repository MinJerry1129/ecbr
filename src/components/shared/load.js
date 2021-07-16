import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import LootieView from 'lottie-react-native';
import { Typography, Colors } from '../../styles';
import loaderLootie from '../../assets/animations/loader.json';

export default function Load({ title, subTitle, tranparent = false }) {
  return (
    <View style={tranparent ? styles.containerBackground : styles.container}>
      {title != null && <Text style={styles.txt}>{title}</Text>}
      {/* <ActivityIndicator
        size="large"
        color={Colors.PRIMARY}
        style={styles.activityLoad}
      /> */}
      <LootieView
        source={loaderLootie}
        style={{ height: 120 }}
        resizeMode="contain"
        loop
        autoPlay
      />
      {subTitle !== null && <Text style={styles.txt}>{subTitle}</Text>}
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
  containerBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },
  txt: {
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.WHITE,
  },
  activityLoad: {
    marginTop: 20,
    marginBottom: 20,
  },
});
