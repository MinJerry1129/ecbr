import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const NotResults = ({type}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/search/icon_search.png')}
        resizeMode={'contain'}
      />
      <View style={styles.contentText}>
        <Text style={styles.title}>
          Não foi possível localizar o que você procura nesta categoria
        </Text>
        <Text style={styles.subTitle}>
          Você pode buscar também na categoria{' '}
          {type === 'restaurant' ? 'supermercados' : 'restaurantes'}
        </Text>
      </View>
    </View>
  );
};

export default NotResults;
