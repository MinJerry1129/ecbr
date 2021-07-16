import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {PRIMARY, DARK, GREY} from '../../../../styles/colors';

const Wish = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/search/genie.png')}
        resizeMode={'contain'}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>O que Deseja ?</Text>
        <Text style={styles.subTitle}>
          Mercados, restaurantes, bebidas ou então suas refeições preferidas
        </Text>
      </View>
    </View>
  );
};

export default Wish;
