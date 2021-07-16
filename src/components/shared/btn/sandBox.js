/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../styles';
import config from '../../../config';

import LootieView from 'lottie-react-native';
import attencionLootie from '../../../assets/animations/attencion.json';

const SandBox = ({}) => {
  const [isSandBox, setIsSandBox] = useState(false);

  useEffect(() => {
    // let url = config.apiUrl;
    // let urlSearch = url.search('localhost');

    // if (typeof config.sandbox === 'undefined' || config.sandbox === true) {
    //   setIsSandBox(true);
    // } else if (urlSearch > -1) {
    //   setIsSandBox(true);
    // }

    if (config.environment !== 'Production') {
      setIsSandBox(true);
    }
  }, []);

  return (
    <>
      {isSandBox === true ? (
        <View style={styles.container}>
          <View style={styles.content}>
            <LootieView
              source={attencionLootie}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="cover"
              loop
              autoPlay
            />
            <Text style={styles.title}>
              {config.environment === 'Dev'
                ? 'Ambiente Local'
                : 'Ambiente de Teste'}
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    // left: Dimensions.get('window').width / 2 - 50,
    right: 10,
  },
  content: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: 20,
    // paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_12,
  },
});

export default SandBox;
