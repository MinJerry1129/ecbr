/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import randomcolor from 'randomcolor';
import GallerySwiper from 'react-native-gallery-swiper';

import AppOfferApi from '../../../../services/appOffer';
import { StorageGet } from '../../../../services/deviceStorage';
import { Colors } from '../../../../styles';

import styles from './styles';

const Tabloids = () => {
  const insets = useSafeAreaInsets();

  const [tabloids, setTabloids] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const getTabloidsPremium = useCallback(async () => {
    try {
      const respAddress = await StorageGet('@addressUser');
      const { data } = await AppOfferApi.get(
        `/tabloid/show?page=1&limit=50&city=${respAddress?.city}&premium=true`,
      );

      setTabloids(data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const showTabloidDetail = item => {
    const objectImage = [];

    for (const respImage of item.tabloids.images) {
      objectImage.push({
        uri: respImage,
      });
    }

    setGalleryImages(objectImage);
    setModalVisible(true);
  };

  const closeModalTabloid = () => {
    setGalleryImages([]);
    setModalVisible(false);
  };

  useEffect(() => {
    getTabloidsPremium();
  }, []);

  return Object.keys(tabloids).length ? (
    <View>
      <Text style={styles.title}>Panfleto</Text>
      <FlatList
        data={tabloids}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => showTabloidDetail(item)}
            style={styles.boxTabloid}>
            <ImageBackground
              source={{
                uri: item.tabloids.images[0],
              }}
              resizeMode="contain"
              imageStyle={styles.ImageBackgroundProps}
              style={[
                styles.ImageBackground,
                { backgroundColor: randomcolor() },
              ]}>
              <View style={styles.boxBrand}>
                <FastImage
                  source={{
                    uri: item.tabloids.brand,
                    priority: FastImage.priority.normal,
                  }}
                  style={styles.brand}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            </ImageBackground>
            <Text style={styles.name} numberOfLines={1}>
              {item.tabloids.company[0].name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => closeModalTabloid()}>
        <View
          style={[
            styles.centeredView,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}>
          <TouchableOpacity
            onPress={() => closeModalTabloid()}
            style={[
              styles.header,
              {
                paddingTop: insets.top,
              },
            ]}>
            <Icon name="keyboard-arrow-left" size={40} color="#fff" />
          </TouchableOpacity>
          <GallerySwiper
            sensitiveScroll={false}
            images={galleryImages}
            onSwipeDownReleased={() => closeModalTabloid()}
            flatListProps={{
              initialNumToRender: 2,
              getItemLayout: (data: any, index: number) => ({
                length: Dimensions.get('screen').width,
                offset: Dimensions.get('screen').width * index,
                index,
              }),
            }}
            removeClippedSubviews
            imageComponent={({ source }: any) => (
              <>
                <ActivityIndicator
                  size="large"
                  color={Colors.WHITE}
                  style={styles.loader}
                />
                <FastImage
                  style={styles.galleryImage}
                  source={{
                    uri: source.uri,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </>
            )}
          />
        </View>
      </Modal>
    </View>
  ) : null;
};

export default Tabloids;
