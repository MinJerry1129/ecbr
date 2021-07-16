import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import { round, formatMoney } from '../../../../utils';
import { distanteFormat } from '../../../../services/maps/distanceCoordinate';

const Card = ({ item: { item }, address, type }) => {
  const navigation = useNavigation();
  const [companyType] = useState(type);

  const noImage = require('../../../../assets/images/product/no_image.png');
  const imageLoad = require('../../../../assets/images/product/image_load.png');

  const goToCompany = () => {
    if (companyType === 'restaurant') {
      navigation.navigate('Restaurant', {
        screen: 'RestaurantProduct',
        params: { company: item },
      });
    } else if (companyType === 'supermarket') {
      navigation.navigate('Supermarket', {
        screen: 'Product',
        params: { company: item },
      });
    }
  };

  const goToProductCompany = product => {
    if (companyType === 'restaurant') {
      navigation.navigate('Restaurant', {
        screen: 'RestaurantProductDetails',
        params: {
          idProduct: product._id,
          company: item,
          cartItem: null,
        },
      });
    } else if (companyType === 'supermarket') {
      navigation.navigate('Supermarket', {
        screen: 'ProductDetails',
        params: {
          idProduct: product._id,
          company: item,
          addProduct: true,
        },
      });
    }
  };

  const itemCompanyProducts = products => {
    try {
      return (
        <ScrollView
          horizontal={true}
          style={styles.boxScrollProducts}
          showsHorizontalScrollIndicator={false}>
          {products.map(product => (
            <TouchableOpacity
              key={product._id}
              style={styles.boxProducts}
              onPress={() => goToProductCompany(product)}>
              {product.images.length > 0 && product.images[0] ? (
                <FastImage
                  style={styles.imageProduct}
                  source={{ uri: product.images[0] }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              ) : (
                  <FastImage
                    style={styles.imageProduct}
                    source={noImage}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                )}

              <View>
                <Text
                  style={styles.boxProductsInfoText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {product.name}
                </Text>
                <Text
                  style={styles.boxProductsDescripText}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {product?.description}
                </Text>
                <View style={styles.containerPrice}>
                  {product.pricePromotion ? (
                    <>
                      <Text style={styles.boxProductsInfoPrice}>
                        {formatMoney(product.pricePromotion)}
                      </Text>
                      <Text style={styles.boxProductsInfoOldPrice}>
                        {formatMoney(product.price)}
                      </Text>
                    </>
                  ) : (
                      <Text style={styles.boxProductsInfoPrice}>
                        {formatMoney(product.price)}
                      </Text>
                    )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } catch (err) {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardTitle}>
        {item.images ? (
          <FastImage
            defaultSource={noImage}
            source={{
              uri: item?.images[0],
              priority: FastImage.priority.high,
            }}
            style={styles.contentImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
            <Text>Sem Imagem</Text>
          )}

        <TouchableOpacity
          style={styles.contentInfo}
          onPress={() => goToCompany()}>
          <Text style={styles.titleCompany}>{item?.name}</Text>
          <View style={styles.contentNote}>
            <Text style={styles.txtStar}>
              <Icon name="star" size={12} />
              {item.companyDelivery?.totalRating > 20
                ? round(item.companyDelivery.mediaRating, 1)
                : 'Novo'}
            </Text>
            {address && address.location ? (
              <Text style={styles.txtDistance}>
                {distanteFormat(
                  {
                    latitude: address.location.coordinates[1],
                    longitude: address.location.coordinates[0],
                  },
                  {
                    latitude: item.location.coordinates[1],
                    longitude: item.location.coordinates[0],
                  },
                )}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewMore} onPress={() => goToCompany()}>
          <Text style={styles.viewMoreTitle}>Ver mais</Text>
        </TouchableOpacity>
      </View>

      {item && item.products ? itemCompanyProducts(item.products) : null}
    </View>
  );
};

export default React.memo(Card);
