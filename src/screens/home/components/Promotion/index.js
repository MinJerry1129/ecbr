/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {discountRestaurant} from './../../../../services/service/company/discount';

const Promotion = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const [companyPromotion, setCompanyPromotion] = useState(null);

  useEffect(() => {
    if (companyPromotion === null && user && user.location) {
      getRestaurantsDiscount();
    }
  }, [user?.location?.coordinates]);

  const getRestaurantsDiscount = async () => {
    let response = await discountRestaurant({
      latitude: user.location.coordinates[1],
      longitude: user.location.coordinates[0],
    });

    if (response && response.length > 0) {
      setCompanyPromotion(response);
    }
  };

  const goCompany = item => {
    return navigation.navigate('Restaurant', {
      screen: 'RestaurantProduct',
      params: {
        company: item,
      },
    });
  };

  return (
    <>
      {companyPromotion && companyPromotion.length > 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Quer mais economia?</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatStyle}
            data={companyPromotion}
            keyExtractor={item => `${item._id}`}
            renderItem={item => (
              <TouchableOpacity
                style={styles.content}
                onPress={() => goCompany(item.item)}>
                <View style={styles.dicountInfo}>
                  <Text style={styles.dicountInfoTxt}>
                    ATÉ {item.item.product.percentualDiscount}% OFF
                  </Text>
                </View>
                <FastImage
                  style={styles.imageProduct}
                  source={{uri: item.item.images[0]}}
                  resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={styles.titleContainer}>
                  <Text style={styles.titleCompany} numberOfLines={1}>
                    {item?.item?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </>
  );
};

export default React.memo(Promotion);
