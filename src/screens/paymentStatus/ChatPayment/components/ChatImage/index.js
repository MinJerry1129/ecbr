import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import imgLoad from '../../../../../assets/images/image_load.png';

const ChatImage = ({item}) => {
  const imageBase64 = () => {
    try {
      if (item.urlFile) {
        return {uri: item.urlFile};
      }

      return {};
    } catch (err) {
      console.log('Fail ImageBase64', err);
      return {};
    }
  };

  return (
    <View style={styles.container}>
      <ImageZoom
        useNativeDriver={true}
        enableSwipeDown={false}
        style={styles.iconPersonContainer}
        cropWidth={300}
        cropHeight={300}
        imageWidth={300}
        imageHeight={300}>
        <Image
          defaultSource={imgLoad}
          source={imageBase64()}
          resizeMode="contain"
          style={styles.iconPersonContainer}
        />
      </ImageZoom>
    </View>
  );
};

export default ChatImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  iconPersonContainer: {
    width: 300,
    height: 300,
  },
});
