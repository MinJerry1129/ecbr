/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import {
  View,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';

import {styles} from './styles';
import {Colors} from '../../../styles';
import { listSlider } from '../../../services/service/slider';

let {width} = Dimensions.get('window');

export const SliderComponent = props => {

  const [slider, setSlider] = useState([]);
  const [loadImage, setLoadImage] = useState(true);

  useEffect(() => {
    const list = async () => {
      setLoadImage(true);
      const result = await listSlider();
      setLoadImage(false);
      if (result) {
        setSlider(result);
      }
    };
    list();
  }, []);

  return (
    <View style={{width: width, alignItems: 'center'}} >
      {!loadImage ? (
      <Swiper
        style={{height: width / 2}}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={2}>
        {slider && slider.length > 0 && slider.map(itembann => {
          return (
            <Image
              key={itembann._id}
              style={styles.cardImage}
              resizeMode="contain"
              source={{uri: itembann.images[0]}}
            />
          );
        })}
      </Swiper>
      ) : (
        <View>
          <ActivityIndicator style={{height: 200}} size="large" color={Colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};

export default SliderComponent;
