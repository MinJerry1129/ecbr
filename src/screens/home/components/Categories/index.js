import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const Categories = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const contentArray = [
    {
      id: '1',
      name: 'Mercados',
      image: require('./images/supermarket.png'),
      page: 'Supermarket',
      screen: 'Supermarket',
      params: {},
    },
    {
      id: '2',
      name: 'Restaurantes',
      image: require('./images/restaurant.png'),
      page: 'Restaurant',
      screen: 'Restaurant',
      params: {},
    },
    {
      id: '3',
      name: 'Acessórios',
      color: '#f2f2f2',
      image: require('./images/accessories.png'),
      page: 'Accessories',
      screen: 'Accessories',
      params: {},
    },
  ];

  const getScreenAndGo = (page, screen, params) => {
    const getScreen = screen ? screen : page;

    navigation.navigate(page, {
      screen: getScreen,
      params,
    });
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? null : (
    <View style={{ flexDirection: 'row' }}>
      {contentArray.map(item => {
        return (
          <TouchableOpacity
            style={styles.boxCategories}
            onPress={() => getScreenAndGo(item.page, item.screen, item.params)}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={item.image}
            />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Categories;
